import express from "express"
import {
  editProfile,
  getMe,
  login,
  logout,
  register,
} from "./controllers/userController.js"
import {
  createArticle,
  deleteArticle,
  editArticle,
  getAllArticle,
  getArticle,
  getMyArticles,
  searchArticle,
} from "./controllers/articleController.js"
import { uploadAvatar, uploadCover } from "./middleware/multer.js"
import { verifyToken } from "./middleware/authMiddleware.js"

const route = express()

route.post("/register", register)
route.post("/login", login)
route.get("/getMe", verifyToken, getMe)
route.get("/logout", logout)
route.put("/editProfile", verifyToken, uploadAvatar, editProfile)

route.get("/getMyArticles", verifyToken, getMyArticles)
route.post("/create", verifyToken, uploadCover, createArticle)
route.put("/edit/:id", verifyToken, uploadCover, editArticle)
route.delete("/delete/:id", verifyToken, deleteArticle)
route.get("/searchArticle", searchArticle)
route.get("/:id", getArticle)
route.get("/", getAllArticle)

export default route
