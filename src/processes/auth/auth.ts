import { logout } from "@/lib/network/token"
import { forward, createEffect, UnitValue } from "effector-root"
import { requestModule } from "@/shared/api/common/request"
import { sessionToken } from "@/feature/user/session-token"
import { loggedIn } from "@/feature/user/user.model"

const clearTokenInCookieFx = createEffect(sessionToken.remove)

forward({
  from: loggedIn,
  to: requestModule.addDefaultHeaders.prepend<UnitValue<typeof loggedIn>>(({ token }) => ({
    "Authorization": `JWT ${token}`
  }))
})

forward({
  from: logout,
  to: [
    requestModule.deleteDefaultHeaders.prepend(() => "Authorization"),
    clearTokenInCookieFx
  ]
})
