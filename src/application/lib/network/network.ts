import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

export type NetworkError = AxiosError

const axios = Axios.create()

// axios.interceptors.request.use(config => {
//   const token = localStorage.getItem("__token__")
//   token && (config.headers["Authorization"] = `JWT ${token}`)
//   return config
// })

export const get = <R, Params = {}>(url: string, params?: Params): Promise<AxiosResponse<R>> =>
  axios.get(url, { params })

export const post = <R, Data>(url: string, data: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<Response>> =>
  axios.post(url, data, config)
