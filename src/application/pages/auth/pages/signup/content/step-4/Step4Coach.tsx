import { getYearsCount } from "@/application/lib/helpers/date"
import { CoachHeader } from "@/application/pages/auth/pages/signup/content/step-4/coach/CoachHeader"
import { CoachInformation } from "@/application/feature/coach-get-access/components/CoachInformation"
import { Step4CoachLayout } from "@/application/pages/auth/pages/signup/content/step-4/coach/Step4CoachLayout"
import { step4CoachMounted } from "@/application/pages/auth/pages/signup/content/step-4/step-4-coach.model"
import {
  $userData,
  registerUserFx,
  skipCoach,
  userRegistered,
} from "@/application/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import { useEffect } from "react"
import * as React from "react"

export const Step4Coach = () => {
  const userData = useStore($userData)
  const loading = useStore(registerUserFx.pending)
  const years = getYearsCount(userData.clientData?.birthDate!)
  const sex = { M: "мужской", F: "женский" }[userData.clientData?.sex || "M"]

  useEffect(() => step4CoachMounted(), [])

  return (
    <Step4CoachLayout
      renderHeader={() => (
        <CoachHeader
          avatar={userData.clientData?.avatar!}
          fullName={`${userData.clientData?.firstName} ${userData.clientData?.lastName}`}
          years={years}
          sex={sex}
          onSkip={() => skipCoach()}
        />
      )}
    >
      <CoachInformation onRegisterClick={() => userRegistered()} loading={loading} />
    </Step4CoachLayout>
  )
}
