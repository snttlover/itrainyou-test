const dataSource = typeof window === "undefined" ? process : window

export const config = {
  BACKEND_URL: dataSource.env.BACKEND_URL,
}
