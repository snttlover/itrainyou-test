import { Category } from "@/application/feature/categories/categories.store"
import { Day, ISODate, Sex } from "@/application/lib/api/interfaces/utils.interface"
import { keysToCamel } from "@/application/lib/network/casing"
import { post } from "@/application/lib/network/network"

export interface ClientSelfData {
  id: number
  user: UserSelfData
  firstName: string
  lastName: string
  birthDate: Day
  sex: Sex
  avatar: string
  favouriteCoaches: []
  categories: Category[]
  creationDatetime: ISODate
  completedSessionsCount: number
  spentHoursCount: number
}

export interface CoachSelfData {
  id: number
  user: UserSelfData
  firstName: string
  lastName: string
  birthDate: Day
  prices: {
    D30: string
    D45: string
    D60: string
    D90: string
  }
  sex: Sex
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
  bannedClients: []
  restrictedClients: []
  rating: number
  reviewsCount: number
  nearestSessionDatetime: ISODate
  lastRegistrationApplyDatetime: ISODate
  creationDatetime: ISODate
}

export interface UserSelfData {
  id: number
  email: string
  creationDatetime: string
  timeZone: string
}

export interface LoginResponse {
  token: string
  user: UserSelfData & {
    coach: null | CoachSelfData
    client: null | ClientSelfData
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export const login = (data: LoginRequest): Promise<LoginResponse> =>
  post<LoginResponse, LoginRequest>(`${process.env.BACKEND_URL}/api/v1/web/auth/login/`, data)
    .then(response => response.data)
    .then(keysToCamel)
