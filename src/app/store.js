import { configureStore } from "@reduxjs/toolkit";
import repoReducer from '../features/repos/repoSlice';
import searchReducer from '../features/search/searchSlice';
export const store = configureStore({
  reducer: { 
   repos: repoReducer,
   search: searchReducer,
  },
});