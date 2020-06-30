import { createChatListModule } from "@/pages/client/chats/list/features/chat/modules/chat-list"
import { getCoachChats } from "@/lib/api/chats/coach/get-chats"
import { coachChatsSocket } from "@/components/layouts/behaviors/dashboards/coach/CoachDashboardLayout"

export const coachChatsList = createChatListModule({
  fetchChatsListMethod: getCoachChats,
  type: "coach",
  socket: coachChatsSocket
})
