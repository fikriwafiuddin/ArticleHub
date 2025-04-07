import { useState } from "react"
import Icon from "./Icon"
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../redux/thunk/userThunk"
import { API_URL } from "../../BASE_URL"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const openPopover = () => {
    if (isOpen) setIsOpen(false)
    else setIsOpen(true)
  }

  const handleLogout = () => dispatch(logout())

  const toRegister = () => navigate("/register")

  const Popover = () => {
    return (
      <div className="absolute right-0 bg-slate-100 w-32 py-1 pl-3 pr-8 mt-2 rounded z-10">
        <ul className="leading-8 text-left">
          <li>
            <Link to="/myArticles">My Articles</Link>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <nav className="flex justify-between items-center px-4 py-3">
      <h1 className="text-xl font-bold">ArticleHub</h1>
      <div className="flex gap-3">
        {user ? (
          <>
            <Link
              to="/create"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Create
            </Link>
            <button onClick={openPopover} className="relative" type="button">
              {user.avatar ? (
                <img
                  src={`${API_URL}/${user.avatar}`}
                  alt="avatar"
                  className="size-10 rounded-full"
                />
              ) : (
                <Icon type="userCircle" style="size-10 text-slate-400" />
              )}
              {isOpen && <Popover />}
            </button>
          </>
        ) : (
          <Button primary type={"button"} handleClick={toRegister}>
            Register
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
