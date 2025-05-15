import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'search/fetchUsers',
  async (searchTerm) => {
    if (!searchTerm) return [];
    const response = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
    return response.data.items;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;