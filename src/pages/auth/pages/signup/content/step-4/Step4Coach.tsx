import { getYearsCount } from "@/lib/formatting/date"
import { CoachHeader } from "@/pages/auth/pages/signup/content/step-4/coach/CoachHeader"
import { CoachInformation } from "@/feature/coach-get-access/components/CoachInformation"
import { Step4CoachLayout } from "@/pages/auth/pages/signup/content/step-4/coach/Step4CoachLayout"
import { step4CoachMounted } from "@/pages/auth/pages/signup/content/step-4/step-4-coach.model"
import { $userData, registerUserFx, skipCoach, userRegistered } from "@/pages/auth/pages/signup/signup.model"
import { useEvent, useStore } from "effector-react/ssr"
import { useEffect } from "react"
import * as React from "react"

export const Step4Coach = () => {
  const userData = useStore($userData)
  const loading = useStore(registerUserFx.pending)
  const _step4CoachMounted = useEvent(step4CoachMounted)
  const _skipCoach = useEvent(skipCoach)
  const _userRegistered = useEvent(userRegistered)

  const years = getYearsCount(userData.clientData?.birthDate!)
  const sex = { M: "мужской", F: "женский" }[userData.clientData?.sex || "M"]

  useEffect(() => _step4CoachMounted(), [])

  return (
    <Step4CoachLayout
      renderHeader={() => (
        <CoachHeader
          avatar={userData.clientData?.avatar!}
          fullName={`${userData.clientData?.firstName} ${userData.clientData?.lastName}`}
          years={years}
          sex={sex}
          onSkip={() => _skipCoach()}
        />
      )}
    >
      <CoachInformation onRegisterClick={() => _userRegistered()} loading={loading} />
    </Step4CoachLayout>
  )
}
