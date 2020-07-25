import { DurationType } from "@/lib/api/coach-sessions"

export interface ScheduleDaySlot {
  id: number
  sessionDurationType: DurationType
  startTime: string
}

export interface CoachSchedule {
  id: number
  isAvailable: boolean
  d30Price: string
  d45Price: string
  d60Price: string
  d90Price: string
  weekdaySlots: {
    weekday: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
    slots: ScheduleDaySlot[]
  }[]
}

export interface CreateCoachSchedule {
  isAvailable?: boolean
  d30Price: number | null
  d45Price: number | null
  d60Price: number | null
  d90Price: number | null
  weekdaySlots?: {
    weekday: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
    slots: {
      sessionDurationType: DurationType
      startTime: string
    }[]
  }[]
}

export interface UpdateCoachSchedule {
  id?: number
  isAvailable?: boolean
  d30Price?: number
  d45Price?: number
  d60Price?: number
  d90Price?: number
  weekdaySlots?: {
    weekday: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
    slots: {
      sessionDurationType: DurationType
      startTime: string
    }[]
  }[]
}
