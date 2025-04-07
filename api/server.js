import express from "express"
import "dotenv/config"
import connectDb from "./utils/db.js"
import route from "./router.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT

connectDb()
app.use(express.json())
app.use(cookieParser())
app.use(express.static("images"))
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)
app.use(route)

app.listen(port ? port : 5000, () => {
  console.log(`Server running on port ${port ? port : 5000}`)
})
