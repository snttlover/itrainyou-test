import { $isLoggedIn } from "@/application/feature/user/user.model"
import { useStore } from "effector-react"
import Router from "next/router"
import React from "react"

type Options = {
  to?: string
  as?: string
}

export const withGuest = ({ to = "/", as = "/" }: Options) => (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isAuthed = useStore($isLoggedIn)

    if (isAuthed) {
      if (typeof document !== "undefined") {
        Router.replace(to, as, { shallow: true })
      }
      return null
    }

    return <Child {...props} />
  }
}
