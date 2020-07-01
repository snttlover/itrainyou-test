export interface CoachSchedule {
  id: number
  isAvailable: boolean
  d30Price: string
  d45Price: string
  d60Price: string
  d90Price: string
  weekdaySlots: {
    weekday: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
    slots: {
      id: number
      sessionDurationType: "D30" | "D45" | "D60" | "D90"
      startTime: string
    }[]
  }[]
}

export interface CreateCoachSchedule {
  isAvailable: boolean
  d30Price: string
  d45Price: string
  d60Price: string
  d90Price: string
  weekdaySlots: {
    weekday: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"
    slots: {
      sessionDurationType: "D30" | "D45" | "D60" | "D90"
      startTime: string
    }[]
  }[]
}
