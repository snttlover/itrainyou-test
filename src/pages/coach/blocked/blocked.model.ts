import { banClient } from "@/lib/api/restriction/ban-client"
import { getBannedClients, GetBannedClientsResponse } from "@/lib/api/restriction/get-banned-clients"
import { getRestrictedClients } from "@/lib/api/restriction/get-restricted-client"
import { restrictClient } from "@/lib/api/restriction/restrict-client"
import { unbanClient } from "@/lib/api/restriction/unban-client"
import { unrestrictClient } from "@/lib/api/restriction/unrestrict-client"
import { createGate } from "@/scope"
import { createEffect, forward, restore } from "effector-root"
import { some } from "patronum"

export const BlockedPageGate = createGate()

const getBannedClientsFx = createEffect({ handler: getBannedClients })
const getRestrictedClientsFx = createEffect({ handler: getRestrictedClients })
export const banClientFx = createEffect({ handler: banClient })
export const unbanClientFx = createEffect({ handler: unbanClient })
export const restrictClientFx = createEffect({ handler: restrictClient })
export const unrestrictClientFx = createEffect({ handler: unrestrictClient })

const setIsBanned = (clients: GetBannedClientsResponse[]) => clients.map(client => ({ ...client, isBanned: true }))
const findAndSetIsBanned = (isBanned: boolean) => (
  clients: (GetBannedClientsResponse & { isBanned: boolean })[],
  { params: id }: { params: number }
) => {
  return clients.map(client => (client.id === id ? { ...client, isBanned } : client))
}

export const $bannedClients = restore(getBannedClientsFx.doneData.map(setIsBanned), [])
  .on(banClientFx.done, findAndSetIsBanned(true))
  .on(unbanClientFx.done, findAndSetIsBanned(false))
  .reset(BlockedPageGate.open)

export const $restrictedClients = restore(getRestrictedClientsFx.doneData.map(setIsBanned), [])
  .on(restrictClientFx.done, findAndSetIsBanned(true))
  .on(unrestrictClientFx.done, findAndSetIsBanned(false))
  .reset(BlockedPageGate.open)

export const $isLoading = some(true, [getBannedClientsFx.pending, getRestrictedClientsFx.pending])

forward({
  from: BlockedPageGate.open,
  to: [getBannedClientsFx, getRestrictedClientsFx],
})
