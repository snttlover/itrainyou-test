import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { patch } from "@/lib/network/network"

export type UpdateClientNoteRequest = {
  id: number
  text: string
}

export type UpdateClientNoteResponse = {
  id: number
  coach: number
  client: number
  text: string
}

export const updateClientNote = ({ id, text }: UpdateClientNoteRequest): Promise<UpdateClientNoteResponse> =>
  patch(`${config.BACKEND_URL}/api/v1/web/clients/${id}/note/`, { text })
    .then(response => response.data)
    .then(keysToCamel)
