import { $isFullRegistered, $isLoggedIn } from "@/feature/user/user.model"
import { useStore } from "effector-react/ssr"
import { useRouter } from "next/router"
import React from "react"

export const withFullRegister = (Child: React.ComponentType) => {
  return ({ ...props }) => {
    const isFullRegister = useStore($isFullRegistered)
    const isLoggedIn = useStore($isLoggedIn)
    const router = useRouter()

    if (isLoggedIn && !isFullRegister) {
      router.replace("/auth/signup/[step]", "/auth/signup/2", { shallow: true })
      return null
    }

    return <Child {...props} />
  }
}
