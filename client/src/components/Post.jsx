import { useNavigate } from "react-router-dom"
import { API_URL } from "../../BASE_URL"
import Button from "./Button"
import { useDispatch } from "react-redux"
import { deleteArticle } from "../redux/thunk/articleThunk"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Post({ cover, title, summary, id, time, options = false }) {
  const date = new Date(time)
  const year = date.getUTCFullYear()
  const month = date.toLocaleString("en-US", { month: "short" })
  const day = date.getUTCDate()
  const navigate = useNavigate()

  const { isLoadingDelete } = useSelector((state) => state.article)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteArticle({ id }))
  }

  return (
    <article className="flex bg-white transition hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          dateTime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>{year}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>
            {month} {day}
          </span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt=""
          src={`${API_URL}/${cover}`}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href={`/${id}`}>
            <h3 className="font-bold uppercase text-gray-900">{title}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {summary}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          {options && (
            <div className="flex justify-end mb-2 sm:mb-0 mr-5 gap-2">
              <Button primary handleClick={() => navigate(`/edit/${id}`)}>
                Edit
              </Button>
              <Button
                disable={isLoadingDelete}
                handleClick={() => handleDelete(id)}
                light
                handle
              >
                {isLoadingDelete ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
          <Link
            to={`/${id}`}
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Post
