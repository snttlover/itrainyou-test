import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CardResponse, getClientCardsList } from "@/lib/api/wallet/client/get-cards-list"
import { createEffect, createEvent, forward, restore, split, guard } from "effector-root"
import { deleteCard as deleteClientCard } from "@/lib/api/wallet/client/delete-card"
import { deleteCard as deleteCoachCard } from "@/lib/api/wallet/coach/delete-card"
import { makeCardPrimary as makeClientCardPrimary } from "@/lib/api/wallet/client/make-card-primary"
import { makeCardPrimary as makeCoachCardPrimary } from "@/lib/api/wallet/coach/make-card-primary"
import { some } from "patronum"
import { getCardSessions, CardSessionsResponse } from "@/lib/api/wallet/client/get-card-sessions"
import { toggleDeleteCardModalDialog } from "@/pages/client/profile/profile-page.model"
import { getCoachCardsList } from "@/lib/api/wallet/coach/get-cards-list"
import { SessionsHistoryGate } from "@/pages/coach/profile/session-history/sessions-history.model"

class DeleteCardCancelError extends Error {}
export const deletedClientCard = createEvent<number>()

export const deletedCoachCard = createEvent<number>()

export const confirmDeleteCard = createEvent<number>()

export const loadClientCardsFx = createEffect({
  handler: getClientCardsList,
})

export const loadCoachCardsFx = createEffect({
  handler: getCoachCardsList,
})

export const getCardSessionsFx = createEffect({
  handler: getCardSessions,
})

export const deleteClientCardFx = createEffect({
  handler: (id: number) => deleteClientCard(id)
})

export const deleteCoachCardFx = createEffect({
  handler: (id: number) => deleteCoachCard(id)
})

const madeClientCardPrimaryFx = createEffect({
  handler: (id: number) => makeClientCardPrimary(id)
})

const madeCoachCardPrimaryFx = createEffect({
  handler: (id: number) => makeCoachCardPrimary(id)
})

export const madeClientCardPrimary = createEvent<number>()

export const madeCoachCardPrimary = createEvent<number>()

forward({
  from: madeClientCardPrimary,
  to: madeClientCardPrimaryFx,
})

forward({
  from: madeCoachCardPrimary,
  to: madeCoachCardPrimaryFx,
})

forward({
  from: madeClientCardPrimaryFx.done,
  to: loadClientCardsFx,
})

forward({
  from: [madeCoachCardPrimaryFx.done, SessionsHistoryGate.open],
  to: loadCoachCardsFx,
})

forward({
  from: deletedClientCard,
  to: getCardSessionsFx,
})

forward({
  from: getCardSessionsFx.done.map(() => true),
  to: toggleDeleteCardModalDialog,
})

forward({
  from: confirmDeleteCard,
  to: deleteClientCardFx,
})

forward({
  from: deletedCoachCard,
  to: deleteCoachCardFx,
})

forward({
  from: deleteClientCardFx.done.map(() => false),
  to: toggleDeleteCardModalDialog,
})

const { canceledCardDelete, __: cardDeleteError } = split(deleteClientCardFx.fail, {
  canceledCardDelete: ({ error }) => error instanceof DeleteCardCancelError,
})

const successRemoveToast: Toast = { type: "info", text: "Карта успешно удалена" }
forward({
  from: deleteClientCardFx.done.map(() => successRemoveToast),
  to: [toasts.remove, toasts.add, loadClientCardsFx.prepend(() => {})],
})

forward({
  from: deleteCoachCardFx.done.map(() => successRemoveToast),
  to: [toasts.remove, toasts.add, loadCoachCardsFx.prepend(() => {})],
})

const failedRemoveToast: Toast = { type: "error", text: "Не удалось удалить карту" }
forward({
  from: cardDeleteError.map(() => failedRemoveToast),
  to: [toasts.remove, toasts.add],
})

export const $isLoading = some({ predicate: true, stores: [loadClientCardsFx.pending, deleteClientCardFx.pending] })

const $clientCards = restore<CardResponse[]>(
  loadClientCardsFx.doneData.map(data => data.results),
  []
)

const $coachCards = restore<CardResponse[]>(
  loadCoachCardsFx.doneData.map(data => data.results),
  []
)

export const $clientCardsListForView = $clientCards.map(cards =>
  cards.map(card => ({
    id: card.id,
    type: card.cardType,
    cardEnd: card.lastFourDigits,
    expireDate: `${card.expiryMonth}/${card.expiryYear}`,
    isPrimary: card.isPrimary,
  }))
)

export const $coachCardsListForView = $coachCards.map(cards =>
  cards.map(card => ({
    id: card.id,
    type: card.cardType,
    cardEnd: card.lastFourDigits,
    expireDate: `${card.expiryMonth}/${card.expiryYear}`,
    isPrimary: card.isPrimary,
  }))
)

const $cardSessions = restore<CardSessionsResponse[]>(
  getCardSessionsFx.doneData.map(data => data.results),
  []
)

export const $cardsSessionsForView = $cardSessions.map(sessions =>
  sessions.map(session => ({
    id: session.id,
    startDateTime: session.startDatetime,
    endDateTime: session.endDatetime,
    duration: session.durationType,
    coach: session.coach,
  }))
)

export const cardIdForDelete = restore<number>(
  deletedClientCard,
  null
)