import dynamic from "next/dynamic"
import React from "react"

const SignUp = dynamic(() => import("@/application/pages/auth/pages/signup/SignUpPage"), { ssr: false })

export default () => <SignUp />
