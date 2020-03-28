import { $isLoggedIn } from "@/application/feature/user/user.model"
import { useStore } from "effector-react"
import { useRouter } from "next/router"
import React from "react"

type Options = {
  to?: string
  as?: string
}

export const withProtect = ({ to = "/", as = "/" }: Options) => (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isAuthed = useStore($isLoggedIn)
    const router = useRouter()

    if (!isAuthed) {
      router.replace(to, to, { shallow: true })
      return null
    }

    return <Child {...props} />
  }
}
