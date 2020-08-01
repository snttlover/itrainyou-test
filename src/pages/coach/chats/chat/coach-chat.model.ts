import { createChatModule } from "@/feature/chat"
import { coachChatsSocket } from "@/feature/socket/chats-socket"
import { getCoachChat } from "@/lib/api/chats/coach/get-chat"
import { getCoachChatMessages } from "@/lib/api/chats/coach/get-messages"
import { getCoachSessions } from "@/lib/api/coach-sessions"
import { getCoachChatSessions } from "@/lib/api/chats/coach/get-chat-sessions"

export const coachChat = createChatModule({
  type: `coach`,
  fetchChat: getCoachChat,
  socket: coachChatsSocket,
  fetchMessages: getCoachChatMessages,
  fetchSessions: getCoachChatSessions
})
