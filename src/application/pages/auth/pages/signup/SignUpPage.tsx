import { pageMounted } from "@/application/pages/auth/pages/signup/signup.model"
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as React from "react"
import { Step1 } from "@/application/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@/application/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@/application/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@/application/pages/auth/pages/signup/content/step-4/Step4"

export default () => {
  const router = useRouter()
  const currentStep = router ? +router.query.step : null
  useEffect(() => {
    if (!currentStep) router.replace('/signup/1')
    pageMounted()
  }, [])

  switch (currentStep) {
    case 1:
      return <Step1 />
    case 2:
      return <Step2 />
    case 3:
      return <Step3 />
    case 4:
      return <Step4 />
    default:
      return null
  }
}
