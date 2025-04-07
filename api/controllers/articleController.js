import User from "../models/userModel.js"
import Article from "../models/articleModel.js"
import fs from "fs"
import { console } from "inspector"

export const getAllArticle = async (req, res) => {
  try {
    const allArticle = await Article.find().select("-content")
    if (!allArticle || allArticle.length === 0)
      return res.status(404).json({ message: "Article not found" })

    return res.status(200).json({ message: "Success", articles: allArticle })
  } catch (error) {
    console.log(error)
    res.status(500).json("System error")
  }
}

export const getArticle = async (req, res) => {
  const id = req.params.id
  try {
    if (!id) {
      return res.status(404).json({ message: "Article not found" })
    }
    console.log(id)

    const article = await Article.findById(id).populate("author", "name")
    if (!article) return res.status(404).json("Article not found!")

    return res.status(200).json({ message: "Success", article })
  } catch (error) {
    console.log("Error in getArticle function", new Date(), error)
    res.status(500).json("System error")
  }
}

export const createArticle = async (req, res) => {
  const id = req.id
  const { title, summary, content } = req.body
  const cover = req.file
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })

    if (!title || !summary || !content || !cover)
      return res.status(401).json({ message: "Please add all fields!" })

    await Article.create({
      author: user._id,
      title,
      cover: cover.filename,
      summary,
      content,
    })
    return res.status(200).json({ message: "Aticle successfully created" })
  } catch (error) {
    console.log(error)
    res.status(500).json("System error")
  }
}

export const getMyArticles = async (req, res) => {
  const id = req.id
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json("User not found!")

    const articles = await Article.find({ author: user._id })
    if (!articles || articles.length == 0)
      return res.status(404).json({ message: "Articles not found!" })

    return res.status(200).json({ message: "Success", articles })
  } catch (error) {
    console.log("Error in getMyArticles function", new Date(), error)
    return res.status(500).json("System error")
  }
}

export const editArticle = async (req, res) => {
  const id = req.params.id
  const { title, summary, content } = req.body
  const user = req.id
  const cover = req.file
  try {
    const article = await Article.findById(id)
    if (!article) return res.status(404).json({ message: "Article not found" })

    if (article.author.toString() !== user) {
      return res
        .status(401)
        .json({ message: "You are not the author of this article" })
    }

    if (!title || !summary || !content) {
      return res.status(401).json({ message: "Please add all fields!" })
    }

    if (cover) {
      fs.unlinkSync(`images/${article.cover}`)
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover: cover ? cover.filename : article.cover,
      },
      { new: true }
    )

    return res.status(200).json({ message: "Success", article: updatedArticle })
  } catch (error) {
    console.log(error)
    res.status(500).json("System error")
  }
}

export const deleteArticle = async (req, res) => {
  const id = req.params.id
  const user = req.id
  try {
    const article = await Article.findById(id)
    if (!article) return res.status(404).json({ message: "Article not found" })

    if (article.author.toString() !== user)
      return res
        .status(401)
        .json({ message: "You are not the author of this article" })

    fs.unlinkSync(`images/${article.cover}`)
    await Article.findByIdAndDelete(id)
    return res.status(200).json({ message: "Delete success", id })
  } catch (error) {
    console.log("Error in deleteArticle function", new Date(), error)
    res.status(500).json("System error")
  }
}

export const searchArticle = async (req, res) => {
  const query = req.query.query
  try {
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
      ],
    })
    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Article not found" })
    }

    return res.status(200).json({ message: "Success", articles })
  } catch (error) {
    console.log("Error in searchArticle function", new Date(), error)
    res.status(500).json("System error")
  }
}
