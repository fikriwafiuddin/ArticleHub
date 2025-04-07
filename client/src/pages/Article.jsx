import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import { API_URL } from "../../BASE_URL"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import DOMPurify from "dompurify"
import { formatDate } from "../helpers/timeHelper"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { getArticle } from "../redux/thunk/articleThunk"

function Article() {
  const { article, isLoading, error } = useSelector((state) => state.article)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getArticle({ id }))
    }
  }, [dispatch, id])

  return (
    <>
      <Navbar />
      <main className="pt-2 pb-10 max-w-7xl mx-auto px-3">
        <Button
          light
          type={"button"}
          custom={"mb-2"}
          handleClick={() => navigate("/")}
        >
          {"< Back"}
        </Button>
        {isLoading && <h1 className="mt-3 text-center text-2xl">Loading...</h1>}
        {error && <h1 className="mt-3 text-center text-2xl">{error}</h1>}
        {article && (
          <>
            <div className="max-h-96 overflow-hidden">
              <img
                className=" mx-auto"
                src={`${API_URL}/${article.cover}`}
                alt={article.title}
              />
            </div>
            <div className="mt-2 mb-5">
              <h1 className="font-bold text-2xl">{article.title}</h1>
              <p>{article.author.name}</p>
              <time dateTime={formatDate(article.createdAt)}>
                {formatDate(article.createdAt)}
              </time>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
              }}
              className="leading-7 no-tailwind-reset"
            ></div>
          </>
        )}
      </main>
    </>
  )
}

export default Article
