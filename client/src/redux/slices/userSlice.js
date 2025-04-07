import { createSlice } from "@reduxjs/toolkit"
import { editProfile, getMe, login, logout, register } from "../thunk/userThunk"

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    success: null,
    isLoadingGetUser: true,
    isLoadingLogout: false,
    isLoadingLogin: false,
    isLoadingRegister: false,
    isLoadingEditProfile: false,
    isEditLoading: false,
    msgSuccess: "",
    msgError: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.msgError = null
      state.msgSuccess = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoadingRegister = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.msgSuccess = action.payload.message
        state.isLoadingRegister = false
        state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.msgError = action.payload
        state.isLoadingRegister = false
      })
    builder
      .addCase(login.pending, (state) => {
        state.isLoadingLogin = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingLogin = false
        state.msgSuccess = action.payload.message
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingLogin = false
        state.msgError = action.payload
      })
      .addCase(getMe.pending, (state) => {
        state.isLoadingGetUser = true
        state.error = null
        state.user = null
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoadingGetUser = false
        state.user = action.payload
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoadingGetUser = false
      })
    builder
      .addCase(logout.pending, (state) => {
        state.isLoadingLogout = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoadingLogout = false
        state.msgSuccess = action.payload.message
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.msgError = action.payload
      })
    builder
      .addCase(editProfile.pending, (state) => {
        state.isLoadingEditProfile = true
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoadingEditProfile = false
        state.msgSuccess = action.payload.message
        state.user = action.payload.user
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoadingEditProfile = false
        state.msgError = action.payload
      })
  },
})

export const { clearMessage } = userSlice.actions
export default userSlice.reducer
