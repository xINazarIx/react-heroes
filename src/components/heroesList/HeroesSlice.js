import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle'
});

export const fetchHeroesThunk = createAsyncThunk(
  'heroes/fetchHeroesThunk',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/heroes");
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: (state, action) => {heroesAdapter.setOne(state, action.payload)},
  
    heroDelete: (state, action) => {
      heroesAdapter.removeOne(state, action.payload)
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroesThunk.pending, state => {state.heroesLoadingStatus = 'loading'})
      .addCase(fetchHeroesThunk.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchHeroesThunk.rejected, state => {state.heroesLoadingStatus = 'error'})
  }
})

const {actions, reducer} = heroesSlice;

export default reducer;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroesReducer)

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDelete
} = actions