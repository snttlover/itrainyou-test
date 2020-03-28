import upArrow from "./images/up-arrow.svg"
import downArrow from "./images/down-arrow.svg"
import { CoachSortingType } from "@/application/lib/api/coach"

export type SortingItemType = {
  text: string
  value: CoachSortingType
  icon: any
}

export const sortingItems: SortingItemType[] = [
  {
    text: `По популярности`,
    value: `popularity`,
    icon: upArrow
  },
  {
    text: `По популярности`,
    value: `-popularity`,
    icon: downArrow
  },
  {
    text: `По цене`,
    value: `price`,
    icon: upArrow
  },
  {
    text: `По цене`,
    value: `-price`,
    icon: downArrow
  }
]
