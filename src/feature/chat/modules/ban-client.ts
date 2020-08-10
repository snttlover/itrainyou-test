// блокировка клиентов коучем
import { combine, createEffect, createEvent, guard } from "effector-root"
import { coachChat } from "@/pages/coach/chats/chat/coach-chat.model"
import { $bannedUsers, $restrictedUsers, $userData } from "@/feature/user/user.model"
import { banClient } from "@/lib/api/coach/ban/ban-client"
import { unBanClient } from "@/lib/api/coach/ban/unban-client"
import { restrictClient } from "@/lib/api/coach/ban/restrict-client"
import { unRestrictClient } from "@/lib/api/coach/ban/unrestrict-client"
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

$bannedUsers
  .on(banFx.done, (ids, { params }) => [...ids, params])
  .on(unBanFx.done, (ids, { params }) => ids.filter(id => id !== params))

$restrictedUsers
  .on(restrictFx.done, (ids, { params }) => [...ids, params])
  .on(unRestrictFx.done, (ids, { params }) => ids.filter(id => id !== params))

guard({
  source: toggleClientBan,
  filter: combine(coachChat.chat.$chat, $userData, (chat, user) => {
    return !!chat && !!user && !user.coach?.bannedClients.includes(chat.userId as number)
  }),
  target: banFx,
})

guard({
  source: toggleClientBan,
  filter: combine(coachChat.chat.$chat, $userData, (chat, user) => {
    return !!chat && !!user && !!user.coach?.bannedClients.includes(chat.userId as number)
  }),
  target: unBanFx,
})

guard({
  source: toggleClientRestrict,
  filter: combine(coachChat.chat.$chat, $userData, (chat, user) => {
    return !!chat && !!user && !user.coach?.restrictedClients.includes(chat.userId as number)
  }),
  target: restrictFx,
})

guard({
  source: toggleClientRestrict,
  filter: combine(coachChat.chat.$chat, $userData, (chat, user) => {
    return !!chat && !!user && !!user.coach?.restrictedClients.includes(chat.userId as number)
  }),
  target: unRestrictFx,
})

export const $banLoading = some(v => v, [restrictFx.pending, unRestrictFx.pending, banFx.pending, unBanFx.pending])
