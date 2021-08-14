import { getMyUserApiFx } from "@/shared/api/users/get-my-user"
import * as React from "react"
import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { useStore } from "effector-react"
import { Loader } from "@/old-components/spinner/Spinner"
import { CoachSupportChat } from "@/feature/support"

const features = ["Начать онлайн чат с агентом поддержки", "Решить возникшую проблему или уточнить интересующий вопрос"]

export const CoachSupportPage = () => {
  const isUserDataLoading = useStore(getMyUserApiFx.fx.pending)

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
