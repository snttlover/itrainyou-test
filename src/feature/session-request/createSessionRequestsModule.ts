import { createCoachSessionRequest, SessionRequestParams } from "../../lib/api/coach/create-session-request"
import { denyCoachSessionRequest, DenySessionRequestParams } from "@/lib/api/coach/deny-session-request"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { approveCoachSessionRequest, ApproveSessionRequestParams } from "@/lib/api/coach/approve-session-request"
import { combine, createEffect, createEvent, createStore, forward } from "effector-root"
import { createClientSessionRequest } from "@/lib/api/client/create-client-session-request"
import { denyClientSessionRequest } from "@/lib/api/client/deny-session-request"
import { approveClientSessionRequest } from "@/lib/api/client/approve-session-request"

type createSessionRequestsModuleConfig = {
  createRequest: (params: SessionRequestParams) => Promise<SessionRequest>
  denyRequest: (params: DenySessionRequestParams) => Promise<SessionRequest>
  approveRequest: (params: ApproveSessionRequestParams) => Promise<SessionRequest>
}

const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)

export const createSessionRequestsModule = (config: createSessionRequestsModuleConfig) => {
  const createRequest = createEvent<SessionRequestParams>()

  const createSessionRequestFx = createEffect({
    handler: config.createRequest,
  })

  const createRequests = createStore<SessionRequestParams[]>([])
    .on(createRequest, (requests, params) => [...requests, params])
    .on(createSessionRequestFx.finally, (requests, res) => requests.filter(r => !isEqual(r, res.params)))

  forward({
    from: createRequest,
    to: createSessionRequestFx,
  })

  const denyRequest = createEvent<DenySessionRequestParams>()
  const denyRequestFx = createEffect({
    handler: config.denyRequest,
  })
  const denyRequestsIds = createStore<number[]>([])
    .on(denyRequest, (ids, req) => [...ids, req.id])
    .on(denyRequestFx.finally, (ids, req) => ids.filter(id => req.params.id !== id))

  forward({
    from: denyRequest.map(req => req),
    to: denyRequestFx,
  })

  const approveRequest = createEvent<number>()
  const approveRequestFx = createEffect({
    handler: config.approveRequest,
  })
  const approveRequestsIds = createStore<number[]>([])
    .on(approveRequest, (ids, id) => [...ids, id])
    .on(approveRequestFx.finally, (ids, req) => ids.filter(id => req.params.id !== id))

  forward({
    from: approveRequest.map(id => ({ id })),
    to: approveRequestFx,
  })

  const isFetching = {
    approving: (id: number) => combine(createStore(id), approveRequestsIds, (id, ids) => ids.includes(id)),
    denying: (id: number) => combine(createStore(id), denyRequestsIds, (id, ids) => ids.includes(id)),
    creating: (params: SessionRequestParams) =>
      combine(createStore(params), createRequests, (params, reqs) => reqs.find(req => isEqual(req, params))),
  }

  return {
    methods: {
      approve: approveRequest,
      deny: denyRequest,
      create: createRequest,
    },
    events: {
      isFetching,
    },
  }
}

export const coachSessionRequests = createSessionRequestsModule({
  createRequest: createCoachSessionRequest,
  denyRequest: denyCoachSessionRequest,
  approveRequest: approveCoachSessionRequest,
})

export const clientSessionRequests = createSessionRequestsModule({
  createRequest: createClientSessionRequest,
  denyRequest: denyClientSessionRequest,
  approveRequest: approveClientSessionRequest,
})
