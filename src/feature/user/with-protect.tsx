import { navigatePush } from "@/feature/navigation"
import { $isLoggedIn, $isSocialSignupInProgress } from "@/feature/user/user.model"
import { useStore, useEvent } from "effector-react"
import * as React from "react"

type Options = {
  to?: string
}

export const withProtect = ({ to = "/" }: Options) => (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isAuthed = useStore($isLoggedIn)
    const isSocialSignupInProgress = useStore($isSocialSignupInProgress)
    const navigate = useEvent(navigatePush)

    if (!isAuthed && !isSocialSignupInProgress) {
      navigate({ url: to })
      return null
    }

    return <Child {...props} />
  }
}
