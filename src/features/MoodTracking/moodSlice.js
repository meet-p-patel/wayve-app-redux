import { createSlice } from '@reduxjs/toolkit';

export const moodSlice = createSlice({
    name: 'mood',
    initialState: [],
    reducers: {
        addMood: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const selectMood = (state) => state.mood;
export const { addMood } = moodSlice.actions;
export default moodSlice.reducer;