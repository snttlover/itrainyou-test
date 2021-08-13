import { navigateReplace } from "@/feature/navigation"
import { $isFullyRegistered, $isLoggedIn } from "@/feature/user/user.model"
import { getMyUserApiFx } from "@/shared/api/users/get-my-user"
import { useEvent, useStore } from "effector-react"
import * as React from "react"

export const withFullRegister = (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isFullRegister = useStore($isFullyRegistered)
    const isUserLoading = useStore(getMyUserApiFx.fx.pending)
    const isLoggedIn = useStore($isLoggedIn)
    const navigate = useEvent(navigateReplace)

    // if (isLoggedIn && !isFullRegister && !isUserLoading) {
    //   navigate({ url: routeNames.signup("2") })
    //   return null
    // }

    return <Child {...props} />
  }
}
