import { navigateReplace } from "@/feature/navigation"
import { $isFullyRegistered, $isLoggedIn } from "@/feature/user/user.model"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { routeNames } from "@/pages/route-names"
import { useEvent, useStore } from "effector-react"
import * as React from "react"

export const withFullRegister = (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isFullRegister = useStore($isFullyRegistered)
    const isUserLoading = useStore(getMyUserFx.pending)
    const isLoggedIn = useStore($isLoggedIn)
    const navigate = useEvent(navigateReplace)

    // if (isLoggedIn && !isFullRegister && !isUserLoading) {
    //   navigate({ url: routeNames.signup("2") })
    //   return null
    // }

    return <Child {...props} />
  }
}
