import { createChatListModule } from "@/pages/client/chats/list/features/chat/modules/chat-list"
import { getCoachChats } from "@/lib/api/chats/coach/get-chats"
import { coachChatsSocket } from "@/feature/socket/chats-socket"

export const coachChatsList = createChatListModule({
  fetchChatsListMethod: getCoachChats,
  type: "coach",
  socket: coachChatsSocket
})