import { pageMounted } from "@app/pages/auth/pages/signup/signup.model"
import { Redirect, useParams } from "@reach/router"
import { useEffect } from "react"
import * as React from "react"
import { Step1 } from "@app/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@app/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@app/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@app/pages/auth/pages/signup/content/step-4/Step4"

export const SignUpPage = () => {
  const params = useParams()
  const currentStep = params ? +params.step : null
  useEffect(() => pageMounted(), [])

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
      return <Redirect to='/signup/1' replace noThrow />
  }
}
