import { config } from "@/config"
import { Category } from "@/feature/categories/categories.store"
import { Day, ISODate, Sex } from "@/lib/api/interfaces/utils.interface"
import { UserSelfData } from "@/lib/api/login"
import { keysToCamel } from "@/lib/network/casing"
import { get } from "@/lib/network/network"

export interface CoachSelfData {
  id: number
  user: UserSelfData
  firstName: string
  lastName: string
  birthDate: Day
  prices: {
    D30: null | number
    D45: null | number
    D60: null | number
    D90: null | number
  }
  sex: Sex
  originalAvatar: string
  avatar: string
  isForeverRejected: boolean
  isTemporarilyRejected: boolean
  isApproved: boolean
  isTopCoach: boolean
  isProfileFilled: boolean
  photos: string[]
  description: string
  workExperience: string
  education: string
  videoInterview: string
  phone: string
  categories: Category[]
  bannedClients: number[]
  restrictedClients: number[]
  rating: number
  reviewsCount: number
  nearestSessionDatetime: ISODate
  lastRegistrationApplyDatetime: ISODate
  creationDatetime: ISODate
}

export const getMyCoach = (): Promise<CoachSelfData> =>
  get(`${config.BACKEND_URL}/api/v1/web/coaches/me/`)
    .then(response => response.data)
    .then(keysToCamel)
