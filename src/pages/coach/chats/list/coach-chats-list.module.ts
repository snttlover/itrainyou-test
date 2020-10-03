import { createChatListModule } from "@/feature/chats-list/modules/chat-list"
import { getCoachChats } from "@/lib/api/chats/coach/get-chats"
import { coachChatsSocket } from "@/feature/socket/chats-socket"
import { getCoachChat } from "@/lib/api/chats/coach/get-chat"
import { coachCall } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"

export const coachChatsList = createChatListModule({
  fetchChatsListMethod: getCoachChats,
  type: "coach",
  socket: coachChatsSocket,
  getChat: getCoachChat,
  sessionCallModule: coachCall
})
