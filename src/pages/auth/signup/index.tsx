import Router from "next/router"
import { useEffect } from "react"

export default () => {
  useEffect(() => {
    Router.replace("/auth/signup/[step]", "/auth/signup/1")
  }, [])

  return null
}
