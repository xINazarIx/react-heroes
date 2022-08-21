import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchHeroesThunk, heroDelete, heroesFetchingError, selectAll } from './HeroesSlice.js';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './HeroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        state => state.filtersReducer.activeFilter,
        selectAll,
        (filter, heroes) => {
            if(filter === 'all'){
                return heroes
            }else{
                return heroes.filter(item => item.element === filter)
            }
        }
    )
    
    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroesReducer.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroesThunk())
    }, []);

    const onDelete = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => dispatch(heroDelete(id)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {

        if (arr.length === 0) {
            return <CSSTransition timeout={200}  classNames="hero">
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={200}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            <TransitionGroup component={null}>
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;