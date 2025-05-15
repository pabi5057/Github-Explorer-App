import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRepos = createAsyncThunk(
  'repos/fetchRepos',
  async ({ username, page = 1, perPage = 5 }) => {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`
    );
    return { data: res.data, page };
  }
);

const repoSlice = createSlice({
  name: 'repos',
  initialState: {
    repos: [],
    page: 1,
    perPage: 5,
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload.data;
        state.page = action.payload.page;
      })
      .addCase(fetchRepos.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load repositories';
      });
  },
});

export const { setPage } = repoSlice.actions;
export default repoSlice.reducer;
