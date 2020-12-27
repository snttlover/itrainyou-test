export type ClientData = {
  firstName: string
  lastName: string
  middleName: string
  birthDate: string | null
  sex: "M" | "F" | ""
  avatar: string | null
  originalAvatar: string | null
  email: string | null
}

export type CoachData = {
  workExperience: string
  education: string
  description: string
  phone: string
  photos: string[]
  videoInterview: string
  inn: number | string
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