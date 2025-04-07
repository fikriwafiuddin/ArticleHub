export const formatDate = (timestamp) => {
  const date = new Date(timestamp)

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}
