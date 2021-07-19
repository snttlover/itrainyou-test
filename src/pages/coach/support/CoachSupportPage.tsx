import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import * as React from "react"
import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { useStore } from "effector-react"
import { getMyUserFx } from "@/lib/api/users/get-my-user"
import { $coachHomeState } from "@/pages/coach/home/coach-home.model"
import { Loader } from "@/old-components/spinner/Spinner"
import { CoachSupportChat } from "@/feature/support"

const features = ["Начать онлайн чат с агентом поддержки", "Решить возникшую проблему или уточнить интересующий вопрос"]


export const CoachSupportPage = () => {
  const isUserDataLoading = useStore(getMyUserFx.pending)
  const state = useStore($coachHomeState)

  const showPlaceholder = !isUserDataLoading

  return (
    <CoachDashboardLayout>
      {isUserDataLoading && <Loader />}
      {!isUserDataLoading && <CoachSupportChat />}
      {/*showPlaceholder && (
        <ContentContainer>
          <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
        </ContentContainer>
      )*/}
    </CoachDashboardLayout>
  )
}

export default CoachSupportPage
