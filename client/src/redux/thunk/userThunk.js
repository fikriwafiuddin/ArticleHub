import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../BASE_URL"

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password, password2 }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        {
          name,
          email,
          password,
          password2,
        },
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const editName = createAsyncThunk(
  "user/editName",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/editName`,
        { name },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response.payload.message
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getMe`, {
        withCredentials: true,
      })
      return response.data.user
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/logout`, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ name, avatar }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("avatar", avatar)
      const response = await axios.put(`${API_URL}/editProfile`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)
