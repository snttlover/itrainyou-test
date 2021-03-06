import { ContentContainer } from "@/old-components/layouts/ContentContainer"
import * as React from "react"
import { CoachDashboardLayout } from "@/old-components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import { useStore } from "effector-react"
import { $coachAccess } from "@/feature/user/user.model"
import { CoachChatListPage } from "@/pages/coach/chats/list/CoachChatListPage"

const features = ["Смотреть список своих клиентов", "Искать по своим клиентам", "Переходить к диалогу с клиентом"]

const Approved = () => <CoachChatListPage />
const NotApproved = () => (
  <ContentContainer>
    <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
  </ContentContainer>
)

export const CoachClientsPage = () => {
  const isApproved = useStore($coachAccess).isApproved

  return <CoachDashboardLayout>{isApproved ? <Approved /> : <NotApproved />}</CoachDashboardLayout>
}

export default CoachClientsPage
