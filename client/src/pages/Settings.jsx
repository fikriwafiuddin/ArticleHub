import { useSelector } from "react-redux"
import Button from "../components/Button"
import Input from "../components/Input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { editProfile } from "../redux/thunk/userThunk"
import { API_URL } from "../../BASE_URL"

function Settings() {
  const { user } = useSelector((state) => state.user)
  const { isLoadingEditProfile } = useSelector((state) => state.user)
  const [newName, setNewName] = useState(user.name)
  const [newAvatar, setNewAvatar] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()
    if (newAvatar || newName !== user.name) {
      dispatch(editProfile({ name: newName, avatar: newAvatar }))
    }
  }

  return (
    <>
      <Button
        handleClick={() => navigate("/")}
        custom="m-2"
        type="button"
        light
      >
        {"< Back"}
      </Button>
      <h1 className="text-center mt-5 font-bold text-2xl">Settings</h1>
      <div className="mx-auto max-w-96 p-2 mt-5">
        <div className="size-28 mx-auto relative">
          {newAvatar ? (
            <img
              src={URL.createObjectURL(newAvatar)}
              alt="avatar"
              className="size-28 rounded-full mx-auto"
            />
          ) : (
            <>
              {user.avatar ? (
                <img
                  src={`${API_URL}/${user.avatar}`}
                  alt="avatar"
                  className="size-28 rounded-full mx-auto"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-28 mx-auto text-gray-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </>
          )}
          <label
            htmlFor="file_input"
            className="absolute top-0 -right-5 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </label>
          <input
            id="file_input"
            type="file"
            onChange={(e) => setNewAvatar(e.target.files[0])}
            className="hidden"
          />
        </div>
        <form onSubmit={handleEdit} className="flex flex-col flex-grow ml-4">
          <div className="flex flex-col gap-6">
            <Input
              type="text"
              value={newName}
              handleChange={setNewName}
              className="w-full"
            />
            <Input
              type="email"
              value={user.email}
              disabled
              className="w-full"
            />
          </div>
          <div className="mt-4 ml-auto">
            <Button disabled={isLoadingEditProfile} type="submit" primary>
              {isLoadingEditProfile ? "Loading..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Settings
