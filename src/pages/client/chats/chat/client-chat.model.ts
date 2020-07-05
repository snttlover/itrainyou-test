import { createChatModule } from "@/feature/chat"
import { getClientChat } from "@/lib/api/chats/clients/get-chat"
import { clientChatsSocket } from "@/feature/socket/chats-socket"
import { getClientChatMessages } from "@/lib/api/chats/clients/get-messages"

export const clientChat = createChatModule({
  type: `client`,
  fetchChat: getClientChat,
  socket: clientChatsSocket,
  fetchMessages: getClientChatMessages
})
