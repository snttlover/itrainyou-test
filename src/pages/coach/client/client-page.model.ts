import { createPagination } from "@/feature/pagination"
import { ClientResponse, getClient } from "@/lib/api/client/get-client"
import { ClientCoachesResponse, getClientCoaches } from "@/lib/api/client/get-client-coaches"
import { createGate } from "@/scope"
import { createEffect, forward, restore } from "effector-root"
import { some } from "patronum"

export const clientPageGate = createGate<number>()
const loadClientFx = createEffect({ handler: getClient })

export const clientCoachesPagination = createPagination<ClientCoachesResponse>({
  fetchMethod: getClientCoaches,
  $query: restore(
    clientPageGate.open.map(id => ({ id })),
    { id: 0 }
  ),
})

clientCoachesPagination.data.$list.watch(console.log)

export const $clientData = restore<ClientResponse | null>(loadClientFx.doneData, null).reset(clientPageGate.close)

export const $isLoading = some(true, [loadClientFx.pending])

forward({
  from: clientPageGate.open,
  to: [loadClientFx, clientCoachesPagination.methods.loadMore],
})

forward({
  from: clientPageGate.close,
  to: clientCoachesPagination.methods.reset,
})
