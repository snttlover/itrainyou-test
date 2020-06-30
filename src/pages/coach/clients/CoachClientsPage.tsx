import { ContentContainer } from "@/components/layouts/ContentContainer"
import * as React from "react"
import { CoachDashboardLayout } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"
import { CoachSectionPlaceholder } from "@/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/feature/coach-placeholder/right-images/PhoneWithGirl"
import { useStore } from "effector-react/ssr"
import { $coachAccess } from "@/feature/user/user.model"
import { CoachChatsList } from "@/pages/coach/chats/list/container/CoachChatsList"

const features = ["Смотреть список своих клиентов", "Искать по своим клиентам", "Переходить к диалогу с клиентом"]

export const CoachClientsPage = () => {
  const isApproved = useStore($coachAccess).isApproved
  return (
    <CoachDashboardLayout>
      <ContentContainer>
        {isApproved && <CoachChatsList />}
        {!isApproved && <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />}
      </ContentContainer>
    </CoachDashboardLayout>
  )
}

export default CoachClientsPage
