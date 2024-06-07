import { createSlice } from '@reduxjs/toolkit';

const statisticSlice = createSlice({
    name: 'statistics',
    initialState: {
        statistics: null,
        loading: false,
        error: null,
    },
    reducers: {
        fetchStatisticsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchStatisticsSuccess(state, action) {
            state.statistics = action.payload;
            state.loading = false;
        },
        fetchStatisticsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchStatisticsStart,
    fetchStatisticsSuccess,
    fetchStatisticsFailure,
} = statisticSlice.actions;

export default statisticSlice.reducer;
