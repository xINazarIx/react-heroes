import { useHttp } from '../../hooks/http.hook';
import { useSelector, useDispatch } from "react-redux";
import { heroCreated, heroesFetchingError} from '../heroesList/HeroesSlice.js';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid'
import Spinner from "../spinner/Spinner";


import './HeroesAddForm.scss'

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const {request} = useHttp()
    const dispatch = useDispatch()
    const {filters, filtersLoadingStatus} = useSelector(state => state.filtersReducer)
  
    const onLoadHero = (hero) => {

        let newHero = {
          id: nanoid(),
           ...hero
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
          .then(data => dispatch(heroCreated(newHero)))
          .catch(() => dispatch(heroesFetchingError()))
    }


    const renderFilters = (filters, status) => {
      if(status === 'loading'){
        return <option value={""}>Загрузка...</option>
      }else if(status === 'error'){
        return <option value={""}>Ошбика загрузки...</option>
      }

      if(filters && filters.length > 0){
        return filters.map(({name, label}) => {
          if(name === 'all') return;

          return <option key={name} value={name}>{label}</option>
        })
      }

    }

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        element: '',
      }}

      validationSchema={yup.object({
        name: yup.string().min(3, 'Минимум 3 символа!').required('Заполните поле!'),
        description: yup.string().min(3, 'Минимум 3 символа!').required('Заполните поле!'),
        element: yup.string().required('Выберите элемнет!'),
      })}

      onSubmit={(values, actions) => {
        onLoadHero(values)
        actions.resetForm()
      }}
    >
      {({ errors, touched }) => {

        return (
          <Form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-4">
                Имя нового героя
              </label>
              <Field as="input" type="text" name="name" className="form-control" id="name" placeholder="Как меня зовут?" />
              <ErrorMessage name="name" component={ErrorValidateMessage}/>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label fs-4">
                Описание
              </label>
              <Field as="textarea" name="description" className="form-control" id="text" placeholder="Что я умею?" style={{ height: '130px' }} />
              <ErrorMessage name="description" component={ErrorValidateMessage}/>
            </div>

            <div className="mb-3">
              <label htmlFor="element" className="form-label">
                Выбрать элемент героя
              </label>
              <Field as="select" className="form-select" id="element" name="element">
                <option value={""}>Я владею элементом...</option>
                {renderFilters(filters, filtersLoadingStatus)}
              </Field>
              <ErrorMessage name="element" component={ErrorValidateMessage}/>
            </div>

            <button type="submit" className="btn btn-primary">
              Создать
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

const ErrorValidateMessage = ({children}) => {
    return <div className='ErrorMesaage'>{children}</div>
}

export default HeroesAddForm;
