export const getWindowQuery = () => {
  const searchParams = new URLSearchParams(location.search)

  const query: {
    [key: string]: string
  } = {}

  for (const [key, value] of searchParams.entries()) {
    query[key] = value
  }
  return query
}
