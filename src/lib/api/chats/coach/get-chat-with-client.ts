import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import { PersonalChat } from "@/lib/api/chats/clients/get-chats"

export const getChatWithClient = (id: number) =>
  get<PersonalChat, {}>(`${config.BACKEND_URL}/api/v1/web/coach/clients/${id}/chat/`)
    .then(response => response.data)
    .then(keysToCamel)
