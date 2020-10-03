// блокировка клиентов коучем
import { createEffect, createEvent, guard } from "effector-root"
import { coachChat } from "#/pages/coach/chats/chat/coach-chat.model"
import { banClient } from "#/lib/api/coach/ban/ban-client"
import { unBanClient } from "#/lib/api/coach/ban/unban-client"
import { restrictClient } from "#/lib/api/coach/ban/restrict-client"
import { unRestrictClient } from "#/lib/api/coach/ban/unrestrict-client"
import { some } from "patronum"

const banFx = createEffect({
  handler: banClient,
})

const unBanFx = createEffect({
  handler: unBanClient,
})

const restrictFx = createEffect({
  handler: restrictClient,
})

const unRestrictFx = createEffect({
  handler: unRestrictClient,
})

export const toggleClientBan = createEvent<number>()
export const toggleClientRestrict = createEvent<number>()

guard({
  source: toggleClientBan,
  filter: coachChat.chat.$chat.map(chat => !chat.blocked),
  target: banFx,
})

guard({
  source: toggleClientBan,
  filter: coachChat.chat.$chat.map(chat => chat.blocked),
  target: unBanFx,
})

guard({
  source: toggleClientRestrict,
  filter: coachChat.chat.$chat.map(chat => !chat.restricted),
  target: restrictFx,
})

guard({
  source: toggleClientRestrict,
  filter: coachChat.chat.$chat.map(chat => chat.restricted),
  target: unRestrictFx,
})

const updateChat = (key: "isRestricted" | "isBanned", val: boolean) => {
  return (chat: any) => ({ ...chat, [key]: val })
}

coachChat.chat.$chatInfo
  .on(banFx.doneData, updateChat("isBanned", true))
  .on(unBanFx.doneData, updateChat("isBanned", false))
  .on(restrictFx.doneData, updateChat("isRestricted", true))
  .on(unRestrictFx.doneData, updateChat("isRestricted", false))

export const $banClientLoading = some(v => v, [
  restrictFx.pending,
  unRestrictFx.pending,
  banFx.pending,
  unBanFx.pending,
])
