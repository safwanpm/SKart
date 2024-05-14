import { createSlice } from '@reduxjs/toolkit'


const INITIALSTATE = {
    data: null
}


const registerSlice = createSlice({
    name: 'register',
    initialState: INITIALSTATE,
    reducers: {
        HandleOnChange: (state, action) => {
            const { name, value } = action.payload;
            return {
                ...state,
                data: { ...state.data, [name]: value }
            };
        }
    }
});
export const { HandleOnChange } = registerSlice.actions;
export default registerSlice.reducer

