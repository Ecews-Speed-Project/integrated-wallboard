import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ValueState {
  value: string;
}

const initialState: ValueState = {
  value: ''
};

const menuSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { setValue } = menuSlice.actions;
export default menuSlice.reducer;
