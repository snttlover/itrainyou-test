import { $isLoggedIn } from "./user.model"
import { useStore } from "effector-react/ssr"
import React from "react"

type IsGuestProps = {
  children: React.ReactChild
}

export const IsGuest = ({ children }: IsGuestProps) => {
  return useStore($isLoggedIn) ? null : <>{children}</>
}
