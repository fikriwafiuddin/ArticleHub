import mongoose from "mongoose"

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URL)
  const db = mongoose.connection
  db.on("error", (error) => {
    console.log(error)
  })
  db.once("open", () => {
    console.log("Database Connected...")
  })
}

export default connectDb
