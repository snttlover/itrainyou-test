import { createEvent, createStore } from "effector"
import { setSearchPageQuery } from "@/pages/search/coaches-search.model"

export const changeVisibility = createEvent<boolean>()

export const $calendarVisibility = createStore(false)
  .on(changeVisibility, (_, visibility) => visibility)
  .on(setSearchPageQuery, (_, query) => {
    return !!query.nearest_session_date__gte || !!query.nearest_session_date__lte
  })
