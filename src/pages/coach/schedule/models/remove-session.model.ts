import { createEffect, createEvent, createStore, restore } from "effector-root"
import { date } from "@/lib/formatting/date"
import { removeSession } from "@/pages/coach/schedule/models/sessions.model"
import { useEvent } from "effector-react"

export type CoachSession = {
  startTime: Date,
  endTime: Date,
  areAvailable: boolean,
  id: number | null,
  client?: any
}

const _removeSession = useEvent(removeSession)

export const openRemoveSessionModal = createEvent()
export const closeRemoveSessionModal = createEvent()

export const $showRemoveSessionModal = createStore(false)
  .on(openRemoveSessionModal, () => true)
  .on(closeRemoveSessionModal, (() => false))

export const changeRemovingSession = createEvent<CoachSession>()
export const $sessionToDelete = restore<CoachSession>(changeRemovingSession, {
  startTime: date().toDate(),
  endTime: date().toDate(),
  areAvailable: false,
  client: null,
  id: null
})

export const startRemovingSession = createEffect((session: CoachSession) => {
  if(session.areAvailable){
    changeRemovingSession(session)
    openRemoveSessionModal() 
  } else if(session.id){
    _removeSession(session.id)
  }
})

