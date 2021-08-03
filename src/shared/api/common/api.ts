import { requestModule, RequestParams, Response } from "./request"
import { Effect, Event, attach } from "effector-root"

type RequestEffect<PARAMS = void, DONE = void, FAIL = void> = Effect<PARAMS, Response<DONE>, Response<FAIL>>

type Options<PARAMS = void, DONE = void, FAIL  = void> = {
  requestMapper: (params: PARAMS) => RequestParams,
  requestFx?: RequestEffect<RequestParams, any, any>
}

interface ApiEffect<PARAMS, DONE, FAIL> extends RequestEffect<PARAMS, DONE, FAIL> {
  doneBody: Event<DONE>
  failBody: Event<FAIL>
}

const getBody = <T>({ body }: Response<T>) => body

export const createApiEffectCaller = <PARAMS = void, DONE = void, FAIL = void>(options: Options<PARAMS, DONE, FAIL>) => {
  const requestFx = options.requestFx || requestModule.requestFx

  const fx = attach<PARAMS, RequestEffect<RequestParams, DONE, FAIL>>({
    effect: requestFx,
    mapParams: options.requestMapper
  }) as unknown as ApiEffect<PARAMS, DONE, FAIL>

  fx.doneBody = fx.doneData.map(getBody)
  fx.failBody = fx.failData.map(getBody)

  const clone = (): ApiEffect<PARAMS, DONE, FAIL> => {
    const clonedFx = attach({
      effect: fx
    }) as unknown as ApiEffect<PARAMS, DONE, FAIL>

    clonedFx.doneBody = clonedFx.doneData.map(getBody)
    clonedFx.failBody = clonedFx.failData.map(getBody)

    return clonedFx
  }

  return {
    clone,
    fx
  }
}

