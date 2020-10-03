import upArrow from "./images/up-arrow.svg"
import downArrow from "./images/down-arrow.svg"
import { CoachSortingType } from "#/lib/api/coach"

export type SortingItemType = {
  text: string
  value: CoachSortingType
  icon: any
  hideIconOnDesktop?: boolean
}

export const sortingItems: SortingItemType[] = [
  {
    text: `По популярности`,
    value: `popularity`,
    icon: upArrow,
    hideIconOnDesktop: true
  },
  {
    text: `По дате`,
    value: `nearest_session_datetime`,
    icon: downArrow,
    hideIconOnDesktop: true
  },
  {
    text: `По цене`,
    value: `-price`,
    icon: downArrow
  },
  {
    text: `По цене`,
    value: `price`,
    icon: upArrow
  }
]
