import dynamic from "next/dynamic"
import React from "react"

const Login = dynamic(() => import("@/application/pages/auth/pages/login/LoginPage"), {
  ssr: false
})

export default () => <Login />
