import { navigatePush } from "@/feature/navigation"
import { $isLoggedIn, $isLoggedInWithSocials } from "@/feature/user/user.model"
import { useStore, useEvent } from "effector-react"
import * as React from "react"

type Options = {
  to?: string
}

export const withProtect = ({ to = "/" }: Options) => (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isAuthed = useStore($isLoggedIn)
    const isAuthedWithSocials = useStore($isLoggedInWithSocials)
    const navigate = useEvent(navigatePush)

    if (!isAuthed && !$isLoggedInWithSocials) {
      navigate({ url: to })
      return null
    }

    return <Child {...props} />
  }
}
