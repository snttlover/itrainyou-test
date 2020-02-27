import Axios, { AxiosResponse } from "axios"

const axios = Axios.create()

export const get = <R>(url: string): Promise<AxiosResponse<R>> => axios.get(url)
