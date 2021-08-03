import { createEffect, Effect, root } from "effector-root"
import { createApiEffectCaller } from "../api"
import { RequestParams, Response } from "../request"
import { allSettled, fork } from "effector/fork"

describe("createApiEffectCaller", () => {
  const requestHandler = jest.fn()
  let requestFx: Effect<RequestParams, Response, Response>
  beforeEach(() => {
    requestFx = createEffect<RequestParams, Response, Response>(requestHandler)
  })

  afterEach(() => {
    requestHandler.mockReset()
  })

  test("should be main fx called when called cloned fx", async () => {
    requestHandler.mockResolvedValue({ body: 1 })
    const testApiDoneBodyMainFxHandler = jest.fn()

    const requestOptions = (str: string) => ({
      url: `/test/api/${str}`,
      method: "GET"
    })

    const param = "test"

    const testApi = createApiEffectCaller({
      requestFx,
      requestMapper: (a: string) => requestOptions(a)
    })
    testApi.fx.watch(testApiDoneBodyMainFxHandler)

    const clonedTestFx = testApi.clone()
    const scope = fork(root)

    await allSettled(clonedTestFx, {
      scope,
      params: param
    })

    expect(requestHandler).toBeCalledTimes(1)
    expect(requestHandler).toBeCalledWith(requestOptions(param))
    expect(testApiDoneBodyMainFxHandler).toBeCalledWith(param)
  })

  test("should be doneBody event triggered when request done", async () => {
    requestHandler.mockResolvedValue({ body: { field: 1 } })
    const testApiDoneBodyClonedFxHandler = jest.fn()

    const testApi = createApiEffectCaller({
      requestFx,
      requestMapper: () => ({
        url: "/test/api",
        method: "GET"
      })
    })

    const clonedTestFx = testApi.clone()
    clonedTestFx.doneBody.watch(testApiDoneBodyClonedFxHandler)
    const scope = fork(root)

    await allSettled(clonedTestFx, {
      scope
    })

    expect(testApiDoneBodyClonedFxHandler).toBeCalledWith({ field: 1 })
  })

  test("should be failBody event triggered when request failed", async () => {
    requestHandler.mockRejectedValue({ body: { errorCode: 1 } })
    const testApiFailBodyClonedFxHandler = jest.fn()

    const testApi = createApiEffectCaller({
      requestFx,
      requestMapper: () => ({
        url: "/test/api",
        method: "GET"
      })
    })

    const clonedTestFx = testApi.clone()
    clonedTestFx.failBody.watch(testApiFailBodyClonedFxHandler)
    const scope = fork(root)

    await allSettled(clonedTestFx, {
      scope
    })

    expect(testApiFailBodyClonedFxHandler).toBeCalledWith({ errorCode: 1 })
  })
})
