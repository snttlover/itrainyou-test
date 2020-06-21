import { $isFullRegistered, $isLoggedIn } from "@/application/feature/user/user.model"
import { withProtect } from "@/application/feature/user/with-protect"
import { pageMounted } from "@/application/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"
import * as React from "react"
import { Step1 } from "@/application/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@/application/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@/application/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@/application/pages/auth/pages/signup/content/step-4/Step4"

const ProtectedStep2 = withProtect({ to: "/auth/signup/[step]", as: "/auth/signup/1" })(Step2)
const ProtectedStep3 = withProtect({ to: "/auth/signup/[step]", as: "/auth/signup/1" })(Step3)
const ProtectedStep4 = withProtect({ to: "/auth/signup/[step]", as: "/auth/signup/1" })(Step4)

export default () => {
  const isLoggedIn = useStore($isLoggedIn)
  const isFullRegistered = useStore($isFullRegistered)
  const router = useRouter()
  const currentStep = router.query.step ? +router.query.step : null
  useLayoutEffect(() => {
    if (!currentStep) router.replace("/auth/signup/[step]", "/auth/signup/1")
    pageMounted()
  }, [])

  switch (currentStep) {
    case 1:
      if (isLoggedIn && !isFullRegistered) {
        router.replace("/auth/signup/[step]", "/auth/signup/2")
      }
      return <Step1 />
    case 2:
      return <ProtectedStep2 />
    case 3:
      return <ProtectedStep3 />
    case 4:
      return <ProtectedStep4 />
    default:
      router.replace("/auth/signup/[step]", "/auth/signup/1")
  }
  return null
}
