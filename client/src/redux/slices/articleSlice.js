import { createSlice } from "@reduxjs/toolkit"
import {
  createArticle,
  deleteArticle,
  editArticle,
  getArticle,
  getArticles,
  getMyArticles,
  searchArticle,
} from "../thunk/articleThunk"

const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: null,
    article: null,
    myArticles: null,
    isLoading: false,
    isLoadingCreate: false,
    isLoadingEdit: false,
    isLoadingDelete: false,
    msgError: null,
    msgSuccess: null,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.msgError = null
      state.msgSuccess = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.isLoadingCreate = true
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.msgSuccess = action.payload
        state.isLoadingCreate = false
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.msgError = action.payload
        state.isLoadingCreate = false
      })
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload
        state.isLoading = false
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
    builder
      .addCase(getArticle.pending, (state) => {
        state.isLoading = true
        state.article = null
        state.error = null
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload
        state.isLoading = false
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
    builder
      .addCase(getMyArticles.pending, (state) => {
        state.isLoading = true
        state.myArticles = null
        state.error = null
      })
      .addCase(getMyArticles.fulfilled, (state, action) => {
        state.myArticles = action.payload
        state.isLoading = false
      })
      .addCase(getMyArticles.rejected, (state, action) => {
        state.error = action.payload
        state.isLoading = false
      })
    builder
      .addCase(editArticle.pending, (state) => {
        state.isLoadingEdit = true
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.isLoadingEdit = false
        state.msgSuccess = action.payload
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.isLoadingEdit = false
        state.msgError = action.payload
      })
    builder
      .addCase(deleteArticle.pending, (state) => {
        state.isLoadingDelete = true
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoadingDelete = false
        state.msgSuccess = action.payload.message
        state.myArticles = state.myArticles.filter(
          (article) => article._id !== action.payload.id
        )
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoadingDelete = false
        state.msgError = action.payload
          ? action.payload
          : (action.error.message = false)
      })
    builder
      .addCase(searchArticle.pending, (state) => {
        state.isLoading = true
        state.articles = null
        state.error = null
      })
      .addCase(searchArticle.fulfilled, (state, action) => {
        state.articles = action.payload
        state.isLoading = false
      })
      .addCase(searchArticle.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearMessage } = articleSlice.actions

export default articleSlice.reducer
