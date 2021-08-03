import { createRequestModule, RequestParams } from "@/shared/api/common/request"
import { allSettled, fork } from "effector/fork"
import { root } from "effector-root"

describe("request module", () => {
  const headers = {
    Authorization: "JWT test-token"
  }

  const requestParams: RequestParams = {
    url: "/test/url",
    method: "GET"
  }

  const requestHandlerMock = jest.fn().mockResolvedValue({})

  const domain = root.createDomain()
  let module: ReturnType<typeof createRequestModule>

  beforeEach(() => {
    module = createRequestModule({domain})
  })

  afterEach(() => {
    requestHandlerMock.mockReset()
  })

  test("should set default headers and passing to request handler", async () => {
    const scope = fork(domain, {
      handlers: new Map().set(module.__requestFx, requestHandlerMock)
    })

    await allSettled(module.setDefaultHeaders, {
      scope,
      params: headers
    })

    await allSettled(module.requestFx, {
      scope,
      params: requestParams
    })

    expect(requestHandlerMock).toBeCalledWith({
      ...requestParams,
      headers: headers
    })
  })

  test("should set base url and concatenate with passed url", async () => {
    const baseUrl = "https://api.itrainyou.ru/"
    const scope = fork(domain, {
      handlers: new Map().set(module.__requestFx, requestHandlerMock)
    })

    await allSettled(module.setBaseUrl, {
      scope,
      params: baseUrl
    })

    await allSettled(module.requestFx, {
      scope,
      params: requestParams
    })

    expect(requestHandlerMock).toBeCalledWith({
      ...requestParams,
      headers: {},
      url: `${baseUrl}${requestParams.url}`
    })
  })
})
