import { keysToCamel } from "@/application/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface UploadMediaResponse {
  id: number
  type: "IMAGE" | "OTHER"
  file: string
}

export interface UploadMediaRequest {
  type: "IMAGE" | "OTHER"
  file: File | Blob
}

export const uploadMedia = (
  data: UploadMediaRequest,
  onUploadProgress?: (percent: ProgressEvent) => void
): Promise<UploadMediaResponse> => {
  const formData = new FormData()
  formData.append("type", data.type)
  formData.append("file", data.file)

  return post<UploadMediaResponse, FormData>(`http://142.93.228.206:8006/api/v1/media-files/`, formData, {
    onUploadProgress
  })
    .then(response => response.data)
    .then(keysToCamel)
}
