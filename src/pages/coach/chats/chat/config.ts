import { coachChatsSocket } from "@/feature/socket/chats-socket"
import { getCoachChat } from "@/lib/api/chats/coach/get-chat"
import { getCoachChatMessages } from "@/lib/api/chats/coach/get-messages"
import { getCoachChatSessions } from "@/lib/api/chats/coach/get-chat-sessions"
import { getCoachChatMaterials } from "@/lib/api/chats/coach/get-images"

export const coachChatConfig = {
  type: "coach" as 'coach',
  fetchChat: getCoachChat,
  socket: coachChatsSocket,
  fetchMessages: getCoachChatMessages,
  fetchSessions: getCoachChatSessions,
  fetchMaterials: getCoachChatMaterials,
}
