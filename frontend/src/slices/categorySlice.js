import {createSlice} from "@reduxjs/toolkit";

const selectedCategory = JSON.parse(localStorage.getItem("selected_category"));

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        selectedCategory: selectedCategory
    },
    reducers: {
        setAllCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
})

export const {setSelectedCategory, setAllCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;