import { createQueryString } from "@/lib/helpers/query"
import { attach, createEffect, Effect, root, Domain } from "effector-root"
import { setPayload } from "@/shared/lib/reducers"

type Primitive = string | number | boolean
type BodyObject = Record<string, Primitive | Primitive[]>
type Body = BodyObject | BodyObject[]

type RequestHeaders = Record<string, string>

export type RequestParams = {
  url: string;
  method: string;
  body?: BodyInit | Body;
  query?: Record<string, Primitive | Primitive[]>;
  headers?: RequestHeaders;
};

export type Response<T = void> = {
  body: T;
  headers: Headers;
  status: number;
  ok: boolean;
};

export const request = async <R>(params: RequestParams): Promise<Response<R>> => {
  const headers = new Headers(params.headers)

  if (!headers.has("content-type"))
    headers.set("content-type", "application/json; charset=utf-8")
  if (params.body instanceof FormData) headers.delete("content-type")

  const query = createQueryString(params.query)
  const body = headers.get("content-type")?.includes("application/json")
    ? JSON.stringify(params.body)
    : (params.body as BodyInit | undefined)

  const response = await fetch(`${params.url}${query}`, {
    method: params.method,
    body: body ?? null,
    headers,
    credentials: "same-origin",
  })

  const isResponseJson = response.headers
    .get("content-type")
    ?.includes("application/json")

  const answer = {
    body: await (isResponseJson ? response.json() : response.blob()),
    status: response.status,
    ok: response.ok,
    headers: response.headers,
  }

  if (response.ok) return answer
  throw answer
}

type CreateRequestModule = {
  domain?: Domain
}

export const createRequestModule = (options?: CreateRequestModule) => {
  const { createStore, createEvent } = options?.domain ? options?.domain : root.createDomain("request-module")

  const setBaseUrl = createEvent<string>()
  const $baseUrl = createStore<string>("")
    .on(setBaseUrl, setPayload)

  const setDefaultHeaders = createEvent<RequestHeaders>()
  const $defaultHeaders = createStore<RequestHeaders>({})
    .on(setDefaultHeaders, setPayload)

  const __requestFx = createEffect<RequestParams, Response, Response>(request)

  const requestFx = attach<
    RequestParams,
    { headers: typeof $defaultHeaders, baseUrl: typeof $baseUrl },
    Effect<RequestParams, Response, Response>
  >({
    effect: __requestFx,
    source: {
      headers: $defaultHeaders,
      baseUrl: $baseUrl
    },
    mapParams: (params, { headers, baseUrl }) => {
      return {
        ...params,
        url: `${baseUrl}${params.url}`,
        headers: {
          ...headers,
          ...params.headers
        }
      }
    }
  })

  return {
    setDefaultHeaders,
    setBaseUrl,
    __requestFx,
    requestFx
  }
}

export const requestModule = createRequestModule()
