import { createSupportChatModel } from "#/feature/support/create-support-chat.model"
import { getCoachChatMessages } from "#/lib/api/chats/coach/get-messages"
import { clientChatsSocket, coachChatsSocket } from "#/feature/socket/chats-socket"
import { getCoachChat } from "#/lib/api/chats/coach/get-chat"
import { createSupportChat } from "#/feature/support/SupportChat"
import { getClientChatMessages } from "#/lib/api/chats/clients/get-messages"
import { getClientChat } from "#/lib/api/chats/clients/get-chat"

const coachSupportChatModel = createSupportChatModel({
  fetchMessages: getCoachChatMessages,
  socket: coachChatsSocket,
  fetchChat: () => getCoachChat("support"),
  type: "coach",
})

export const CoachSupportChat = createSupportChat(coachSupportChatModel)

const clientSupportChatModel = createSupportChatModel({
  fetchMessages: getClientChatMessages,
  socket: clientChatsSocket,
  fetchChat: () => getClientChat("support"),
  type: "client",
})

export const ClientSupportChat = createSupportChat(clientSupportChatModel)
