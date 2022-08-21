import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../components/heroesList/HeroesSlice.js';
import filtersReducer from '../reducers/filters';

// const enhancer = (createStore) => (...args) => { ДАЁТ ВОЗМОЖНОСТЬ ИСПОЛЬЗОВАТЬ Ф-ЦИЮ DISPATCH БОЛЕЕ ГИБКО
//   const store = createStore(...args);

//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if(typeof(action) === 'string'){
//       return oldDispatch({
//         type: action
//       })
//     }

//     return oldDispatch(action)
//   }

//   return store
// }

// const store = createStore(combineReducers({filtersReducer, heroesReducer}), compose(applyMiddleware(ReduxThunk)));

const store = configureStore({
  reducer: {heroesReducer, filtersReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'prodaction',
})

export default store;