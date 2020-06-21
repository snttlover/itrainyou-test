import { $isFullRegistered, $isLoggedIn } from "@/feature/user/user.model"
import { useStore } from "effector-react/ssr"
import React from "react"
import { useHistory } from "react-router-dom"

export const withFullRegister = (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isFullRegister = useStore($isFullRegistered)
    const isLoggedIn = useStore($isLoggedIn)
    const history = useHistory()

    if (isLoggedIn && !isFullRegister) {
      history.replace("/auth/signup/2")
      return null
    }

    return <Child {...props} />
  }
}
