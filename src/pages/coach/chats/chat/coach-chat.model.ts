import { createChatModule } from "@/feature/chat"
import { coachChatsSocket } from "@/feature/socket/chats-socket"
import { getCoachChat } from "@/lib/api/chats/coach/get-chat"
import { getCoachChatMessages } from "@/lib/api/chats/coach/get-messages"

export const clientChat = createChatModule({
  type: `coach`,
  fetchChat: getCoachChat,
  socket: coachChatsSocket,
  fetchMessages: getCoachChatMessages
})
