import { ContentContainer } from "@/oldcomponents/layouts/ContentContainer"
import * as React from "react"
import { CoachDashboardLayout } from "@/oldcomponents/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import { useStore } from "effector-react"
import { $coachAccess } from "@/feature/user/user.model"
import { CoachChatListPage } from "@/pages/coach/chats/list/CoachChatListPage"

const features = ["Смотреть список своих клиентов", "Искать по своим клиентам", "Переходить к диалогу с клиентом"]

export const CoachClientsPage = () => {
  const isApproved = useStore($coachAccess).isApproved
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        {isApproved && <CoachChatListPage />}
        {!isApproved && <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachClientsPage
