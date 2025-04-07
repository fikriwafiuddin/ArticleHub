import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchArticle } from "../redux/thunk/articleThunk"

function Search() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query) {
      dispatch(searchArticle({ query }))
    }
  }
  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search{" "}
        </label>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          id="Search"
          placeholder="Search article"
          className="w-full rounded-md border-2 border-gray-200 py-2.5 pe-10 pl-3 shadow-sm sm:text-sm"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="submit" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </form>
  )
}

export default Search
