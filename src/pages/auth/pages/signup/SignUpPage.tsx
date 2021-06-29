import { navigateReplace } from "@/feature/navigation"
import { $isFullyRegistered, $isLoggedIn, $isSocialSignupInProgress  } from "@/feature/user/user.model"
import { withProtect } from "@/feature/user/with-protect"
import { routeNames } from "@/pages/route-names"
import { useEvent, useStore } from "effector-react"
import { useEffect } from "react"
import * as React from "react"
import { Step1 } from "@/pages/auth/pages/signup/content/step-1/Step1"
import { Step2 } from "@/pages/auth/pages/signup/content/step-2/Step2"
import { Step3 } from "@/pages/auth/pages/signup/content/step-3/Step3"
import { Step4 } from "@/pages/auth/pages/signup/content/step-4/Step4"
import { useLocation, useParams } from "react-router-dom"
import {
  signUpPageMounted,
  setRedirectToCoachAfterSignUp,
  $coachToRedirectAfterSignUp
} from "@/pages/auth/pages/signup/models/units"
import { $dashboard } from "@/feature/dashboard/dashboard"

const ProtectedStep2 = withProtect({ to: routeNames.signup("1") })(Step2)
const ProtectedStep3 = withProtect({ to: routeNames.signup("1") })(Step3)
const ProtectedStep4 = withProtect({ to: routeNames.signup("1") })(Step4)

type SignUpPageLocation = {
  coachToRedirectAfterSignUp?: number
}

export const SignUpPage = () => {
  const isLoggedIn = useStore($isLoggedIn)
  const isFullyRegistered = useStore($isFullyRegistered)
  const dashboard = useStore($dashboard)  
  const isLoggedInWithSocials = useStore($isSocialSignupInProgress)
  const navigate = useEvent(navigateReplace)
  const _pageMounted = useEvent(signUpPageMounted)
  const params = useParams<{ step: string }>()
  const currentStep = params.step ? +params.step : null

  const _setRedirectToCoachAfterSignUp = useEvent(setRedirectToCoachAfterSignUp)
  const coachToRedirectAfterSignUp = useStore($coachToRedirectAfterSignUp)

  const location = useLocation()

  useEffect(() => {
    const locationState = location.state as SignUpPageLocation
    if (locationState?.coachToRedirectAfterSignUp) {
      _setRedirectToCoachAfterSignUp(locationState.coachToRedirectAfterSignUp)
    }
  }, [location])

  useEffect(() => {
    if (!currentStep) navigate({ url: routeNames.signup("1") })
    _pageMounted()
  }, [])

  // ToDo: вынести роутинг после регистрации в модель
  // Сейчас роутинг после регистрации происходит в данном компоненте
  if (isFullyRegistered) {
    let redirectData

    if (dashboard === "coach") {
      redirectData = { url: routeNames.coach() }
    } else if (dashboard === "client") {
      redirectData = { url: routeNames.client() }

      if (coachToRedirectAfterSignUp) {
        redirectData = {
          url: routeNames.searchCoachPage(coachToRedirectAfterSignUp.toString()),
          state: { freeSessions: true }
        }
      }
    } else {
      redirectData = {
        url: routeNames.client()
      }
    }

    navigate(redirectData)
  }

  switch (currentStep) {
  case 1:
    if ((isLoggedIn && !isFullyRegistered) || isLoggedInWithSocials) {
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
