import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.currentUser = payload;
    },
    setErrorMessage(state, { payload }) {
      state.errorMessage = payload;
    },
  },
});

export const { setCurrentUser, setErrorMessage } = authSlice.actions;

export default authSlice.reducer;
