import { logout } from "@app/feature/user/user.model"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import * as Cookies from "js-cookie"

export type NetworkError = AxiosError

const axios = Axios.create()
if (!process.isServer) {
  axios.interceptors.request.use(config => {
    const token = Cookies.get().__token__
    token && (config.headers["Authorization"] = `JWT ${token}`)
    return config
  })

  axios.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response?.status === 401) {
      logout()
    }
  })
}

export const get = <R, Params = {}>(url: string, params?: Params): Promise<AxiosResponse<R>> =>
  axios.get(url, { params })

export const post = <R, Data>(url: string, data: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<Response>> =>
  axios.post(url, data, config)
