import { createReducer } from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDelete
} from '../actions/index.js'
 
const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

// const heroesReducer = createReducer(initialState, builder => {
//   builder
//     .addCase(heroesFetching, state => {
//       state.heroesLoadingStatus = 'loading';
//     })
//     .addCase(heroesFetched, (state, action) => {
//       state.heroesLoadingStatus = 'idle';
//       state.heroes = action.payload;
//     })
//     .addCase(heroesFetchingError, state => {
//       state.heroesLoadingStatus = 'error';
//     })
//     .addCase(heroCreated, (state, action) => {
//       state.heroes.push(action.payload)
//     })
//     .addCase(heroDelete, (state, action) => {
//       state.heroes = state.heroes.filter(item => item.id !== action.payload)
//     })
//     .addDefaultCase(() => {})
// })

const heroesReducer = createReducer(initialState, {
  [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},

  [heroesFetched]: (state, action) => {
    state.heroesLoadingStatus = 'idle';
    state.heroes = action.payload;
  },

  [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},

  [heroCreated]: (state, action) => {state.heroes.push(action.payload)},

  [heroDelete]: (state, action) => {
    state.heroes = state.heroes.filter(item => item.id !== action.payload);
  },
}, [], state => state) // Последня ф-ция по типу case: default

// const heroesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'HEROES_FETCHING':
//       return {
//         ...state,
//         heroesLoadingStatus: 'loading',
//       };
//     case 'HEROES_FETCHED':
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: 'idle',
//       };
//     case 'HEROES_FETCHING_ERROR':
//       return {
//         ...state,
//         heroesLoadingStatus: 'error',
//       };
//     case 'HERO_DELETE':
//       return {
//         ...state,
//         heroes: state.heroes.filter((item) => item.id !== action.id)
//       };
//     case 'HERO_CREATE':
//       return {
//         ...state,
//         heroes: [...state.heroes, action.hero],
//       };
//     default:
//       return state;
//   }
// };

export default heroesReducer;
