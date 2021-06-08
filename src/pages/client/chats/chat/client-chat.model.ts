import { createChatModule } from "@/feature/chat"
import { clientChatConfig } from "@/pages/client/chats/chat/config"

export const clientChat = createChatModule(clientChatConfig)
