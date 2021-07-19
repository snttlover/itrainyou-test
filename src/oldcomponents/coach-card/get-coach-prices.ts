import { Coach } from "@/lib/api/coach"

type CoachPrice = {
  title: string
  cost: string
}

export const getCoachPrices = (coach: Coach): CoachPrice[] => {
  const filledPriceKeys = Object.keys(coach.prices).filter(key => !!coach.prices[key])

  const titlesMapper = {
    D30: "30 мин",
    D45: "45 мин",
    D60: "60 мин",
    D90: "90 мин",
  }

  return filledPriceKeys.map(key => ({
    title: titlesMapper[key],
    cost: parseInt(coach.prices[key]).toLocaleString(),
  }))
}
