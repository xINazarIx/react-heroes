// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { onToggleFilter, fetchFiltersThunk } from "../../actions";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

    const {filters, activeFilter, filtersLoadingStatus} = useSelector(state => state.filtersReducer);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFiltersThunk(request))
    }, [])

    if(filtersLoadingStatus === 'loading'){
        return <Spinner />
    }else if(filtersLoadingStatus === 'error'){
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if(arr.length === 0){
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            let btnClass = name === activeFilter ? `btn ${className} active` : `btn ${className}`
            return  <button key={name} className={`${btnClass}`} data-filter={name} onClick={() => dispatch(onToggleFilter(name))}>{label}</button>
        })
    }

    let elements = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;