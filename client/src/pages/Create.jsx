import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { createArticle } from "../redux/thunk/articleThunk"

function Create() {
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState(null)
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const { isLoadingCreate } = useSelector((state) => state.article)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createArticle({ title, cover, summary, content }))
  }

  const handleBack = () => {
    navigate("/")
  }
  return (
    <>
      <main className="p-2">
        <Button handleClick={handleBack} light type={"button"}>
          {"< Back"}
        </Button>
        <form onSubmit={handleSubmit}>
          <Input
            label={"Title"}
            id={"title"}
            type={"text"}
            value={title}
            handleChange={setTitle}
            placeholder={"Add title"}
          />
          <div>
            {cover && (
              <img
                className="mx-auto mt-2 max-h-96"
                src={URL.createObjectURL(cover)}
                alt="cover"
              />
            )}
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Add cover
            </label>
            <input
              id="file_input"
              type="file"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="summary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Summary
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              id="summary"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add summary"
            ></textarea>
          </div>
          <div className="mt-4 mb-2">
            <ReactQuill value={content} onChange={setContent} />
          </div>
          <Button
            primary
            type={"submit"}
            handleClick={handleSubmit}
            disabled={isLoadingCreate}
          >
            {isLoadingCreate ? "Creating..." : "Create"}
          </Button>
        </form>
      </main>
    </>
  )
}

export default Create
