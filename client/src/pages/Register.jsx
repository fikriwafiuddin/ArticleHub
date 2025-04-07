import { useState } from "react"
import Input from "../components/Input"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Button from "../components/Button"
import { register } from "../redux/thunk/userThunk"
import { Link } from "react-router-dom"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const { isLoadingRegister } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register({ name, email, password, password2 }))
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to ArticleHub
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form
              action="#"
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <Input
                  label={"Name"}
                  id={"name"}
                  value={name}
                  handleChange={setName}
                  type={"text"}
                />
              </div>

              <div className="col-span-6">
                <Input
                  label={"Email"}
                  id={"email"}
                  value={email}
                  handleChange={setEmail}
                  type={"email"}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label={"Password"}
                  id={"password"}
                  value={password}
                  handleChange={setPassword}
                  type={"password"}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label={"Password Confirmation"}
                  id={"password2"}
                  value={password2}
                  handleChange={setPassword2}
                  type={"password"}
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button primary type={"submit"} disable={isLoadingRegister}>
                  {isLoadingRegister ? "Loading..." : "Create an account"}
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link to="/login" className="text-gray-700 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Register
