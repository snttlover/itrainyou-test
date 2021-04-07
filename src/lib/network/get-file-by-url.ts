import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"
import download from "downloadjs"
import Axios from "axios"

type GetFileParams = {
    responseType: "arraybuffer"
      | "blob"
      | "document"
      | "json"
      | "text"
      | "stream"
}

const axios = Axios.create()

export const getFileName = (path: string) => {
  const name = path.substring((path.indexOf("media/") + 6),path.indexOf("DUP") - 1)
  const fileExtension = path.substring(path.lastIndexOf("."))
  return name + fileExtension
}

export const downloadByURL = (URL: string, filename: string) =>
  axios.request<Blob>({url: URL, method: "GET", responseType: "blob"})
    .then(response => download(response.data, filename))

/*export const downloadByURL = (URL: string, filename: string) =>
  get<Blob, GetFileParams>(URL, {responseType: "blob"})
    .then(response => download(response.data, filename))*/