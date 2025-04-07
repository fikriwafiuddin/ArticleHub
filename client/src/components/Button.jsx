function Button({
  success,
  primary,
  light,
  children,
  custom,
  type,
  handleClick,
  disable = false,
}) {
  let color
  if (success) color = "bg-green-600 text-white"
  if (primary) color = "bg-indigo-600 text-white"
  if (light) color = "border-2"
  return (
    <button
      disabled={disable}
      type={type}
      onClick={handleClick}
      className={`${custom} ${color} block rounded-lg px-5 py-3 text-sm font-medium`}
    >
      {children}
    </button>
  )
}

export default Button
