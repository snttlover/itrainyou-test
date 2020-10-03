import { config } from "#/config"
import { keysToCamel } from "#/lib/network/casing"
import { post } from "#/lib/network/network"

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

  return post<UploadMediaResponse, FormData>(`${config.BACKEND_URL}/api/v1/media-files/`, formData, {
    onUploadProgress,
  })
    .then(response => response.data)
    .then(keysToCamel)
}
