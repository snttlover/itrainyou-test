import { navigateReplace } from "@/feature/navigation"
import { $isFullRegistered, $isLoggedIn } from "@/feature/user/user.model"
import { routeNames } from "@/pages/route-names"
import { useEvent, useStore } from "effector-react/ssr"
import React from "react"

export const withFullRegister = (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isFullRegister = useStore($isFullRegistered)
    const isLoggedIn = useStore($isLoggedIn)
    const navigate = useEvent(navigateReplace)

    if (isLoggedIn && !isFullRegister) {
      navigate({ url: routeNames.signup("2") })
      return null
    }

    return <Child {...props} />
  }
}
