import { ResetPasswordPage } from "@/application/pages/auth/pages/reset-password/ResetPasswordPage"
import { useRouter } from "next/router"
import React from "react"

const ResetPassword = () => {
  const router = useRouter()
  const { token } = router.query
  return (<ResetPasswordPage token={token as string}/>)
}

export default ResetPassword
