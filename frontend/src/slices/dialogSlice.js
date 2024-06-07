import { createSlice } from "@reduxjs/toolkit";
import dialogService from "../services/dialogService"; // Предполагается, что у вас есть сервис для работы с диалогами

const selectedDialog = JSON.parse(localStorage.getItem("selected_dialog"));

export const dialogSlice = createSlice({
    name: 'dialogs',
    initialState: {
        dialogs: [],
        selectedDialog: selectedDialog,
    },
    reducers: {
        setAllDialogs: (state, action) => {
            state.dialogs = action.payload;
        },
        setSelectedDialog: (state, action) => {
            state.selectedDialog = action.payload;
            localStorage.setItem("selected_dialog", JSON.stringify(action.payload));
        },
        addDialog: (state, action) => {
            state.dialogs.push(action.payload);
        },
        removeDialog: (state, action) => {
            state.dialogs = state.dialogs.filter(dialog => dialog.id !== action.payload);
        },
    },
});

export const { setAllDialogs, setSelectedDialog, addDialog, removeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;