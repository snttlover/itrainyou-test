export type ClientData = {
  firstName: string
  lastName: string
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
}

export type UserData = {
  type: "coach" | "client"
  clientData: ClientData
  categories: number[]
  coachData: CoachData
}

export type RegisterUserType = "client" | "coach"

export const REGISTER_SAVE_KEY = "__register-data__"