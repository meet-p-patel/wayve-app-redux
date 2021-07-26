import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {stress: false},
    {anxiety: false}
]

export const strategiesSlice = createSlice({
    name: 'strategies',
    initialState: initialState,
    reducers: {
        updateStress: (state, action) => {
            state[0] = action.payload;
        },
        updateAnxiety: (state, action) => {
            state[1] = action.payload;
        }
        }
})

export const selectStrategy = (state) => state.strategies;
export const { updateStress, updateAnxiety } = strategiesSlice.actions;
export default strategiesSlice.reducer;