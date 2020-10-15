import { $isLoggedIn } from "@/feature/user/user.model"
import { useStore } from "effector-react"
import * as React from "react"

type WithAuthSwitchOptions<T> = {
  authed: React.ComponentType<T> | null
  guest: React.ComponentType<T> | null
}

export const withAuthSwitch = <T,>(opts: WithAuthSwitchOptions<T>) => (props: T) => {
  const isAuthed = useStore($isLoggedIn)
  const authed = opts.authed ? <opts.authed {...props} /> : null
  const guest = opts.guest ? <opts.guest {...props} /> : null

  return isAuthed ? authed : guest
}
