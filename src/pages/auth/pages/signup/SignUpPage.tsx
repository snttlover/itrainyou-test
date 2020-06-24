import { $isFullRegistered, $isLoggedIn } from "@/feature/user/user.model"
import { withProtect } from "@/feature/user/with-protect"
import { pageMounted } from "@/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react/ssr"
import { useEffect } from "react"
import * as React from "react"
import { Step1 } from "@/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@/pages/auth/pages/signup/content/step-4/Step4"
import { useHistory, useParams } from "react-router-dom"

const ProtectedStep2 = withProtect({ to: "/auth/signup/1" })(Step2)
const ProtectedStep3 = withProtect({ to: "/auth/signup/1" })(Step3)
const ProtectedStep4 = withProtect({ to: "/auth/signup/1" })(Step4)

export const SignUpPage = () => {
  const isLoggedIn = useStore($isLoggedIn)
  const isFullRegistered = useStore($isFullRegistered)
  const history = useHistory()
  const params = useParams<{ step: string }>()
  const currentStep = params.step ? +params.step : null

  useEffect(() => {
    if (!currentStep) history.replace("/auth/signup/1")
    pageMounted()
  }, [])

  switch (currentStep) {
    case 1:
      if (isLoggedIn && !isFullRegistered) {
        history.replace("/auth/signup/2")
      }
      return <Step1 />
    case 2:
      return <ProtectedStep2 />
    case 3:
      return <ProtectedStep3 />
    case 4:
      return <ProtectedStep4 />
    default:
      history.replace("/auth/signup/1")
  }
  return null
}
