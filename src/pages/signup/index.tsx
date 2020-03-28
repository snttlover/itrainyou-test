import Router from "next/router"
import { useEffect } from "react"


export default () => {
  useEffect(() => {
    Router.replace('/signup/[step]', '/signup/1')
  }, [])

  return null
}
