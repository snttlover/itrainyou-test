import { navigatePush } from "@/feature/navigation"
import { $isLoggedIn } from "@/feature/user/user.model"
import { useStore, useEvent } from "effector-react/ssr"
import React from "react"

type Options = {
  to?: string
}

export const withProtect = ({ to = "/" }: Options) => (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isAuthed = useStore($isLoggedIn)
    const navigate = useEvent(navigatePush)

    if (!isAuthed) {
      navigate({ url: to })
      return null
    }

    return <Child {...props} />
  }
}
