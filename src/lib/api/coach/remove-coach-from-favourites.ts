import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export interface RemoveCoachFromFavouritesRequest {
  id: number
}

export const removeCoachFromFavourites = ({ id }: RemoveCoachFromFavouritesRequest) =>
  post(`${config.BACKEND_URL}/api/v1/web/coaches/${id}/unfavourite/`)
    .then(response => response.data)
    .then(keysToCamel)
