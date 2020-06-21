import { $isLoggedIn } from "@/feature/user/user.model"
import { useStore } from "effector-react/ssr"
import React from "react"

type IsAuthedProps = {
  children: React.ReactChild
}

export const IsAuthed = ({ children }: IsAuthedProps) => {
  return useStore($isLoggedIn) ? <>{children}</> : null
}
