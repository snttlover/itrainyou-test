import { config } from "#/config"
import { Day, Sex } from "#/lib/api/interfaces/utils.interface"
import { keysToCamel, keysToSnake } from "#/lib/network/casing"
import { patch } from "#/lib/network/network"

export type UpdateMyCoachRequest = {
  firstName?: string
  lastName?: string
  birthDate?: Day
  sex?: Sex
  avatar?: string
  categories: number[]
  workExperience: string
  education: string
  description: string
  photos: string[]
  phone: string
  videoInterview?: string
}

export const updateMyCoach = (data: UpdateMyCoachRequest) =>
  patch(`${config.BACKEND_URL}/api/v1/web/coaches/me/`, keysToSnake(data))
    .then(response => response.data)
    .then(keysToCamel)
