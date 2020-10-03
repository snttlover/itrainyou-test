import { createChatsSocket } from "#/feature/socket/chats-socket"
import { changeToken } from "#/lib/network/token"

export const createAdminChatSocket = (token: string) => {
  changeToken(token)
  return createChatsSocket("admin")
}
