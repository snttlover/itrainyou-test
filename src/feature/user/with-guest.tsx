import { $isFullyRegistered, $isLoggedIn } from "./user.model"
import { useStore } from "effector-react"
import * as React from "react"
import { Redirect } from "react-router-dom"

type Options = {
  to?: string
}

export const withGuest = ({ to = "/" }: Options) => (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isAuthed = useStore($isLoggedIn)
    const isFullRegistered = useStore($isFullyRegistered)

    if (isAuthed && isFullRegistered) {
      return <Redirect to={to} />
    }

    return <Child {...props} />
  }
}
