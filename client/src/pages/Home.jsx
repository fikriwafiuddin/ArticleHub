import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import Post from "../components/Post"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import Footer from "../components/Footer"
import Search from "../components/Search"
import Pagination from "../components/Pagination"
import { getArticles } from "../redux/thunk/articleThunk"

function Home() {
  const { isLoading, articles, error } = useSelector((state) => state.article)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])

  const RenderedArticles = () => {
    return articles.map((article) => (
      <Post
        key={article._id}
        title={article.title}
        cover={article.cover}
        summary={article.summary}
        id={article._id}
        time={article.createdAt}
      />
    ))
  }

  return (
    <>
      <Navbar />
      <main className="pt-5 pb-64 max-w-7xl mx-auto px-3 grid gap-4">
        <div className="max-w-xl mx-auto w-full mb-9">
          <Search />
        </div>
        {isLoading && <h1 className="text-center text-2xl">Loading...</h1>}
        {error && <h1 className="text-center text-2xl">{error}</h1>}
        {articles && <RenderedArticles />}
        {/* <div className="mt-4">
          <Pagination />
        </div> */}
      </main>
      <Footer />
    </>
  )
}

export default Home
