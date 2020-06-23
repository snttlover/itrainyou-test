import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import { CoachChatsList } from "@/application/pages/coach/chats/list/container/CoachChatsList"
import { CoachDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

export default () => (
  <CoachDashboardLayout>
    <ContentContainer>
      <CoachChatsList />
    </ContentContainer>
  </CoachDashboardLayout>
)
