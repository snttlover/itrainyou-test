import { ClientResponse, getClient } from "@/lib/api/client/get-client"
import { updateClientNote } from "@/lib/api/client/update-client-note"
import { createGate } from "@/scope"
import { createEffect, createEvent, createStore, forward, restore, sample } from "effector-root"
import { some } from "patronum"
import { getClientNote } from "@/lib/api/client/get-client-note"

export const clientPageGate = createGate<number>()
const loadClientFx = createEffect({ handler: getClient })
const loadClientNoteFx = createEffect({ handler: getClientNote })
const updateClientNoteFx = createEffect({ handler: updateClientNote })

export const noteChanged = createEvent<string>()
export const saveNote = createEvent()

export const $clientData = restore<ClientResponse | null>(loadClientFx.doneData, null).reset(clientPageGate.close)
export const $note = restore(
  loadClientNoteFx.doneData.map(response => response.text),
  ""
)
  .on(noteChanged, (_, note) => note)
  .reset(clientPageGate.close)

export const setIsEdit = createEvent<boolean>()
export const $isNoteEdit = createStore(false).on(setIsEdit, (_, payload) => payload)

export const $isLoading = some({
  predicate: true,
  stores: [loadClientFx.pending, loadClientNoteFx.pending, updateClientNoteFx.pending],
})

forward({
  from: clientPageGate.open,
  to: [loadClientFx, loadClientNoteFx.prepend(id => ({ id }))],
})

sample({
  clock: saveNote,
  source: { text: $note, id: clientPageGate.state },
  fn: ({ text, id }) => ({
    text,
    id
  }),
  target: updateClientNoteFx
})

forward({
  from: updateClientNoteFx.done,
  to: setIsEdit.prepend(() => false),
})
