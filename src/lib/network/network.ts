import { $token, logout, TOKEN_COOKIE_KEY } from "#/lib/network/token"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { attach, createEffect, forward } from "effector-root"
import Cookies from "js-cookie"
import { runInScope } from "#/scope"

export type NetworkError = AxiosError

const axios = Axios.create()

const requestFx = createEffect({
  handler: (params: AxiosRequestConfig) => axios.request(params),
})

type Params = {
  url: string
  method: "get"
  params?: Record<string, any>
}

export const authorizedRequestFx = attach({
  effect: requestFx,
  source: $token,
  mapParams: (params: Params, token: string) => {
    return {
      ...params,
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  },
})

forward({
  from: requestFx.failData.filterMap(error => ((error as AxiosError)?.response?.status === 401 ? true : undefined)),
  to: logout,
})

axios.interceptors.request.use(config => {
  if (process.env.BUILD_TARGET === "client") {
    const token = Cookies.get(TOKEN_COOKIE_KEY)
    token && (config.headers["Authorization"] = `JWT ${token}`)
  }
  return config
})

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status === 401) {
    runInScope(logout)
  }
  return Promise.reject(error)
})

export const isAxiosError = (error: Error): error is AxiosError => (error as any).isAxiosError

export const get = <R, Params = {}>(url: string, params?: Params): Promise<AxiosResponse<R>> =>
  axios.get(url, { params })

export const post = <R, Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  axios.post(url, data, config)

export const patch = <R, Data>(url: string, data: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  axios.patch(url, data, config)

export const put = <R, Data>(url: string, data: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  axios.put(url, data, config)

export const Delete = <R, Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  axios.delete(url, config)
