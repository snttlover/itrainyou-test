import { createChatListModule } from "@/pages/client/chats/list/features/chat/modules/chat-list"
import { getClientChats } from "@/lib/api/chats/clients/get-chats"
import { clientChatsSocket } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"

export const clientChatsList = createChatListModule({
  fetchChatsListMethod: getClientChats,
  type: "client",
  socket: clientChatsSocket
})
