import { navigateReplace } from "@/feature/navigation"
import { $isFullRegistered, $isLoggedIn, $isSocialSignupInProgress  } from "@/feature/user/user.model"
import { withGuest } from "@/feature/user/with-guest"
import { withProtect } from "@/feature/user/with-protect"
import { signUpPageMounted } from "@/pages/auth/pages/signup/signup.model"
import { routeNames } from "@/pages/route-names"
import { useEvent, useStore } from "effector-react"
import { useEffect } from "react"
import * as React from "react"
import { Step1 } from "@/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@/pages/auth/pages/signup/content/step-4/Step4"
import { useParams } from "react-router-dom"

const ProtectedStep2 = withProtect({ to: routeNames.signup("1") })(Step2)
const ProtectedStep3 = withProtect({ to: routeNames.signup("1") })(Step3)
const ProtectedStep4 = withProtect({ to: routeNames.signup("1") })(Step4)

export const SignUpPage = () => {
  const isLoggedIn = useStore($isLoggedIn)
  const isFullRegistered = useStore($isFullRegistered)
  const isLoggedInWithSocials = useStore($isSocialSignupInProgress)
  const navigate = useEvent(navigateReplace)
  const _pageMounted = useEvent(signUpPageMounted)
  const params = useParams<{ step: string }>()
  const currentStep = params.step ? +params.step : null

  useEffect(() => {
    if (!currentStep) navigate({ url: routeNames.signup("1") })
    _pageMounted()
  }, [])

  switch (currentStep) {
    case 1:
      if ((isLoggedIn && !isFullRegistered) || isLoggedInWithSocials) {
        navigate({ url: routeNames.signup("2") })
      }
      return <Step1 />
    case 2:
      return <ProtectedStep2 />
    case 3:
      return <ProtectedStep3 />
    case 4:
      return <ProtectedStep4 />
    default:
      navigate({ url: routeNames.signup("1") })
  }
  return null
}
