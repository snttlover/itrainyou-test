import { createChatModule } from "@/feature/chat"
import { coachChatConfig } from "@/pages/coach/chats/chat/config"

export const coachChat = createChatModule(coachChatConfig)
