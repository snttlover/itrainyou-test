import { $currentStep, pageMounted, pageUnmount } from "@app/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import { useEffect } from "react"
import * as React from "react"
import { Step1 } from "@app/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@app/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@app/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@app/pages/auth/pages/signup/content/step-4/Step4"

export const SignUpPage = () => {
  const currentStep = useStore($currentStep)

  useEffect(() => {
    pageMounted()
    return () => pageUnmount()
  }, [])

  switch (currentStep) {
    case 1:
      return <Step1 />
    case 2:
      return <Step2/>
    case 3:
      return <Step3/>
    case 4:
      return <Step4/>
    default:
      return <div>Произошла ошибка, обновите страницу</div>
  }
}
