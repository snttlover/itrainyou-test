import { createEffect, createEvent, createStore, restore } from "effector-root"
import { date } from "@/lib/formatting/date"
import { removeSession } from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"

export type CoachSession = {
  startTime: Dayjs,
  endTime: Dayjs,
  areAvailable: boolean,
  id: number | null,
  client?: any
}


export const openRemoveSessionModal = createEvent()
export const closeRemoveSessionModal = createEvent()

export const $showRemoveSessionModal = createStore(false)
  .on(openRemoveSessionModal, () => true)
  .on(closeRemoveSessionModal, (() => false))

export const changeRemovingSession = createEvent<CoachSession>()
export const $sessionToDelete = restore<CoachSession>(changeRemovingSession, {
  startTime: date(),
  endTime: date(),
  areAvailable: false,
  client: null,
  id: null
})

export const startRemovingSession = createEffect((session: CoachSession) => {
  changeRemovingSession(session)
  if(session.areAvailable){
    openRemoveSessionModal()
  } else if(session.id){
    removeSession(session.id)
  }
})

