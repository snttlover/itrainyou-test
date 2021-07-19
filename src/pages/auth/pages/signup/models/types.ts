import { CoachSessionWithSelect } from "@/old-components/coach-card/select-date/select-date.model"

export type ClientData = {
  firstName: string
  lastName: string
  middleName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  originalAvatar: string | null
  email: string | null
  phone: string
  priceRanges: number[]
}

export type CoachData = {
  workExperience: string
  education: string
  description: string
  phone: string
  photos: string[]
  videoInterview: string
  inn: number | string | ""
  legalForm: "SELF_EMPLOYMENT" | "IP_PROFESSIONAL_TAXES" | "IP_OTHER_TAXES" | ""
  socialNetworks: string
  supervisions: string
}

export type UserData = {
  type: "coach" | "client"
  clientData: ClientData
  categories: number[]
  coachData: CoachData
}

export type RegisterUserType = "client" | "coach"

export const REGISTER_SAVE_KEY = "__register-data__"

export const COACH_TO_REDIRECT_AFTER_SIGN_UP = "__coach-to-redirect-after-sign-up__"

export type coachToRedirectAfterSignUpType = {
  coach: number,
  sessions: CoachSessionWithSelect[]
}
