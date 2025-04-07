import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { API_URL } from "../../../BASE_URL"

export const createArticle = createAsyncThunk(
  "article/create",
  async ({ title, cover, summary, content }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("cover", cover)
      formData.append("summary", summary)
      formData.append("content", content)
      const response = await axios.post(`${API_URL}/create`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.message
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getArticle = createAsyncThunk(
  "article/getOne",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data.article
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getArticles = createAsyncThunk(
  "article/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/`, {
        withCredentials: true,
      })
      return response.data.articles
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getMyArticles = createAsyncThunk(
  "article/getMyArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getMyArticles`, {
        withCredentials: true,
      })
      return response.data.articles
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const editArticle = createAsyncThunk(
  "article/edit",
  async ({ id, title, cover, summary, content }, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("cover", cover)
      formData.append("summary", summary)
      formData.append("content", content)
      const response = await axios.put(`${API_URL}/edit/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.message
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteArticle = createAsyncThunk(
  "article/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const searchArticle = createAsyncThunk(
  "article/search",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/searchArticle?query=${query}`
      )
      return response.data.articles
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
