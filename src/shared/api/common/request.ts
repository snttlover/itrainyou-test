import { keysToCamel, keysToSnake } from "@/lib/network/casing"

if (process.env.BUILD_TARGET === "server") {
  require("node-fetch")
}
import { isLiteralObject } from "@/lib/helpers/utils"
import { createQueryString } from "@/shared/lib/query-params-utils"
import { attach, createEffect, Effect, root, Domain } from "effector-root"
import { setPayload } from "@/shared/lib/reducers"
import { PrimitiveType } from "@/shared/lib/types"

type BodyObject = Record<string, PrimitiveType | PrimitiveType[]>
type Body = BodyObject | BodyObject[]

type RequestHeaders = Record<string, string>
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

type RequestQueryParams = Record<string, PrimitiveType | null | undefined>

export type RequestParams = {
  url: string;
  method: RequestMethod;
  body?: BodyInit | Body;
  query?: RequestQueryParams;
  headers?: RequestHeaders;
};

export type Response<T = Body> = {
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
  preTransformBody?: (body: Body) => Body
  preTransformQuery?: (query: RequestQueryParams) => RequestQueryParams
  postTransformBody?: (body: Body) => Body
}

export const createRequestModule = (options?: CreateRequestModule) => {
  const { createStore, createEvent } = options?.domain ? options?.domain : root.createDomain("request-module")

  const preTransformBody = options?.preTransformBody ? options?.preTransformBody : (body: Body) => body
  const preTransformQuery = options?.preTransformQuery ? options?.preTransformQuery : (query: RequestQueryParams) => query

  const postTransformBody = options?.postTransformBody ? options?.postTransformBody : (body: Body) => body

  const setBaseUrl = createEvent<string>()
  const $baseUrl = createStore<string>("")
    .on(setBaseUrl, setPayload)

  const setDefaultHeaders = createEvent<RequestHeaders>()
  const addDefaultHeaders = createEvent<RequestHeaders>()
  const deleteDefaultHeaders = createEvent<string | string[]>()

  const $defaultHeaders = createStore<RequestHeaders>({})
    .on(setDefaultHeaders, setPayload)
    .on(addDefaultHeaders, (defaultHeaders, headersForAdding) => ({
      ...defaultHeaders,
      ...headersForAdding
    }))
    .on(deleteDefaultHeaders, (defaultHeaders, headersForDeleting) => {
      const keysForDelete = Array.isArray(headersForDeleting) ? headersForDeleting : [headersForDeleting]

      const headers = {...defaultHeaders}
      for (const headerKey of keysForDelete) {
        delete headers[headerKey]
      }
      return headers
    })

  const __requestFx = createEffect<RequestParams, Response, Response>(async (requestParams) => {
    if (requestParams.query) {
      requestParams.query = preTransformQuery(requestParams.query)
    }

    if (requestParams.body && isLiteralObject(requestParams.body)) {
      requestParams.body = preTransformBody(requestParams.body as Body)
    }
    try {
      const response: Response = await request(requestParams)

      if (response.body && isLiteralObject(response.body)) {
        response.body = postTransformBody(response.body as Body)
      }

      return response
    } catch (error) {
      if (error.body && isLiteralObject(error.body)) {
        error.body = postTransformBody(error.body as Body)
      }
      throw error
    }
  })

  const requestFx: Effect<RequestParams, Response<any>, Response<any>> = attach<
    RequestParams,
    { headers: typeof $defaultHeaders, baseUrl: typeof $baseUrl },
    Effect<RequestParams, Response, Response>
  >({
    effect: __requestFx,
    source: {
      headers: $defaultHeaders,
      baseUrl: $baseUrl
    },
    mapParams: (params, { headers, baseUrl }) => ({
      ...params,
      url: `${baseUrl}${params.url}`,
      headers: {
        ...headers,
        ...params.headers
      }
    })
  })

  return {
    addDefaultHeaders,
    deleteDefaultHeaders,
    setDefaultHeaders,
    setBaseUrl,
    __requestFx,
    requestFx
  }
}

export const requestModule = createRequestModule({
  preTransformBody: keysToSnake,
  preTransformQuery: keysToSnake,

  postTransformBody: keysToCamel
})
