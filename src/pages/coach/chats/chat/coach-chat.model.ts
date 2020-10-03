import { createChatModule } from "#/feature/chat"
import { coachChatsSocket } from "#/feature/socket/chats-socket"
import { getCoachChat } from "#/lib/api/chats/coach/get-chat"
import { getCoachChatMessages } from "#/lib/api/chats/coach/get-messages"
import { getCoachChatSessions } from "#/lib/api/chats/coach/get-chat-sessions"
import { getCoachChatImages } from "#/lib/api/chats/coach/get-images"

export const coachChat = createChatModule({
  type: `coach`,
  fetchChat: getCoachChat,
  socket: coachChatsSocket,
  fetchMessages: getCoachChatMessages,
  fetchSessions: getCoachChatSessions,
  fetchMaterials: getCoachChatImages,
})
