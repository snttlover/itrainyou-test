import { getClientChat } from "@/lib/api/chats/clients/get-chat"
import { clientChatsSocket } from "@/feature/socket/chats-socket"
import { getClientChatMessages } from "@/lib/api/chats/clients/get-messages"
import { getClientChatSessions } from "@/lib/api/chats/clients/get-chat-sessions"
import { getClientChatMaterials } from "@/lib/api/chats/clients/get-images"

export const clientChatConfig = {
  type: "client" as 'client',
  fetchChat: getClientChat,
  socket: clientChatsSocket,
  fetchMessages: getClientChatMessages,
  fetchSessions: getClientChatSessions,
  fetchMaterials: getClientChatMaterials
}
