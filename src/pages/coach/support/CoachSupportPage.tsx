import { ContentContainer } from "@/components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import * as React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { useStore } from "effector-react/ssr"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { $coachHomeState } from "@/pages/coach/home/coach-home.model"
import { Loader } from "@/components/spinner/Spinner"
import { CoachSupportChat } from "@/feature/support"

const features = ["Начать онлайн чат с агентом поддержки", "Решить возникшую проблему или уточнить интересующий вопрос"]


export const CoachSupportPage = () => {
  const isUserDataLoading = useStore(getMyUserFx.pending)
  const state = useStore($coachHomeState)

  const showPlaceholder = !isUserDataLoading && state !== "approved"

  return (
    <CoachDashboardLayout>
      {isUserDataLoading && <Loader />}
      {!showPlaceholder && <CoachSupportChat />}
      {showPlaceholder && (
        <ContentContainer>
          <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
        </ContentContainer>
      )}
    </CoachDashboardLayout>
  )
}

export default CoachSupportPage
