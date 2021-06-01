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
  let name: string
  let fileExtension: string
  if(path.indexOf("DUP") > 0) {
    name = path.substring((path.indexOf("media/") + 6),path.indexOf("DUP") - 1)
    fileExtension = path.substring(path.lastIndexOf("."))
    return name + fileExtension
  }
  else {
    name = path.substring((path.indexOf("media/") + 6))
    return name
  }
}

export const downloadByURL = (URL: string, filename: string) =>
  axios.request<Blob>({url: URL, method: "GET", responseType: "blob"})
    .then(response => download(response.data, filename, response.data.type))
