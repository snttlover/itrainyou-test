import { config } from "@/config"
import { keysToCamel } from "@/lib/network/casing"
import { post } from "@/lib/network/network"

export interface AddCoachToFavouritesRequest {
  id: number
}

export const addCoachToFavourites = ({ id }: AddCoachToFavouritesRequest) =>
  post(`${config.BACKEND_URL}/api/v1/web/coaches/${id}/favourite/`)
    .then(response => response.data)
    .then(keysToCamel)
