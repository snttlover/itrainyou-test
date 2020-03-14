import Axios, { AxiosError, AxiosResponse } from "axios"

export type NetworkError = AxiosError

const axios = Axios.create()

export const get = <R>(url: string): Promise<AxiosResponse<R>> => axios.get(url)

export const post = <R, Data>(url: string, data: Data): Promise<AxiosResponse<Response>> => axios.post(url, data)
