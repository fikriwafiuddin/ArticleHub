import connectDb from "./utils/db.js"
import User from "./models/userModel.js"
import "dotenv/config"

connectDb()

User.updateMany({}, { $set: { description: "", avatar: "" } })
  .then((res) => console.log({ message: "Succes", res }))
  .catch((err) => console.log({ message: "Error", err }))
