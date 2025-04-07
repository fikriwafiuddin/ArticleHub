import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import fs from "fs"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export const register = async (req, res) => {
  const { name, email, password, password2 } = req.body

  try {
    if (!name || !email || !password || !password2)
      return res.status(401).json({ message: "Please add all fields!" })

    if (password !== password2)
      return setTimeout(() => {
        res.status(401).json({ message: "Please confirm password correctly!" })
      }, 3000)

    const salt = 10
    const hashPassword = bcrypt.hashSync(password, salt)

    const user = await User.findOne({ email })
    if (user)
      return res.status(401).json({ message: "This email is already exist!" })

    const newUser = await User.create({ name, email, password: hashPassword })

    const token = generateToken(newUser._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    return res.status(200).json({
      message: "Register successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        avatar: newUser.avatar,
        description: newUser.description,
      },
    })
  } catch (error) {
    console.log("Error in register function", new Date(), error)
    res.status(500).json("System error")
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password)
      return res.status(401).json({ message: "Please add all fields!" })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found!" })

    const comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword)
      return res.status(401).json({ message: "Please add password correctly!" })
    const token = generateToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    return res.status(200).json({
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        avatar: user.avatar,
        description: user.description,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "System error" })
  }
}

export const getMe = async (req, res) => {
  const id = req.id
  try {
    const user = await User.findById(id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found!" })

    res.status(200).json({ message: "Success", user })
  } catch (error) {
    console.log(error)
    res.status(500).json("System error")
  }
}

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  return res.status(200).json({ message: "Logout successfully" })
}

export const editProfile = async (req, res) => {
  const id = req.id
  const name = req.body.name
  const avatar = req.file
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json("User not found!")

    if (!name) return res.status(400).json("Name cannot be empty")

    if (avatar && user.avatar) {
      fs.unlinkSync(`images/${user.avatar}`)
    }
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      avatar: avatar ? avatar.filename : user.avatar,
    }).select("-password")

    return res
      .status(200)
      .json({ message: "Edit successfully", user: updatedUser })
  } catch (error) {
    console.log("Error in editProfile function", new Date(), error)
    res.status(500).json("System error")
  }
}
