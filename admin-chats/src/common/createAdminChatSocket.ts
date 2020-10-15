import { createChatsSocket } from "@/feature/socket/chats-socket"
import { changeToken } from "@/lib/network/token"

export const createAdminChatSocket = (token: string, query: any) => {
  changeToken(token)
  return
}
