import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchCommentsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCommentsSuccess(state, action) {
            state.comments = action.payload;
            state.loading = false;
        },
        fetchCommentsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchCommentsFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
