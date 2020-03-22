import { keysToCamel } from "@app/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface LoginResponse {
  id: number
  type: "IMAGE" | "OTHER"
  file: string
}

export interface LoginRequest {
  type: "IMAGE" | "OTHER"
  file: File | Blob
}

export const uploadMedia = (data: LoginRequest, onUploadProgress?: (percent: ProgressEvent) => void) => {
  const formData = new FormData()
  formData.append("type", data.type)
  formData.append("file", data.file)
  return post<LoginResponse, FormData>(`http://142.93.228.206:8006/api/v1/media-files/`, formData, {onUploadProgress})
    .then(response => response.data)
    .then(keysToCamel)
}
