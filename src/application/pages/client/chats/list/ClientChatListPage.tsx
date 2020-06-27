import { ClientDashboardLayout } from "@/application/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/application/components/layouts/ContentContainer"
import {ClientChatsList} from "@/application/pages/client/chats/list/container/ClientChatsList"

export default () => (
  <ClientDashboardLayout>
    <ContentContainer>
      <ClientChatsList />
    </ContentContainer>
  </ClientDashboardLayout>
)
