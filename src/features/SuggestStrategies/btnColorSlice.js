import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {stress: false},
    {anxiety: false}
]

export const btnColorSlice = createSlice({
    name: 'btnColor',
    initialState: initialState,
    reducers: {
        toggleStressColor: (state) => {
            state[0].stress = !state[0].stress
        },
        toggleAnxietyColor: (state) => {
            state[1].anxiety = !state[1].anxiety
        }
    }
})

export const selectBtnColor = (state) => state.btnColor;
export const { toggleStressColor, toggleAnxietyColor } = btnColorSlice.actions;
export default btnColorSlice.reducer;