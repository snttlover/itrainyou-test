import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CardResponse, getClientCardsList } from "@/lib/api/wallet/client/get-cards-list"
import { createEffect, createEvent, forward, restore, split, guard } from "effector-root"
import { deleteCard } from "@/lib/api/wallet/client/delete-card"
import { makeCardPrimary } from "@/lib/api/wallet/client/make-card-primary"
import { some } from "patronum"
import { getCardSessions, CardSessionsResponse } from "@/lib/api/wallet/client/get-card-sessions"
import { toggleDeleteCardModalDialog } from "@/pages/client/profile/profile-page.model"
import { getCoachCardsList } from "@/lib/api/wallet/coach/get-cards-list"

class DeleteCardCancelError extends Error {}
export const deletedCard = createEvent<number>()
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

export const deleteCardFx = createEffect({
  handler: (id: number) => deleteCard(id)
})

const madeCardPrimaryFx = createEffect({
  handler: (id: number) => makeCardPrimary(id)
})

export const madeCardPrimary = createEvent<number>()

forward({
  from: madeCardPrimary,
  to: madeCardPrimaryFx,
})

forward({
  from: madeCardPrimaryFx.done,
  to: loadClientCardsFx,
})

forward({
  from: deletedCard,
  to: getCardSessionsFx,
})

forward({
  from: getCardSessionsFx.done.map(() => true),
  to: toggleDeleteCardModalDialog,
})

forward({
  from: confirmDeleteCard,
  to: deleteCardFx,
})

forward({
  from: deleteCardFx.done.map(() => false),
  to: toggleDeleteCardModalDialog,
})

const { canceledCardDelete, __: cardDeleteError } = split(deleteCardFx.fail, {
  canceledCardDelete: ({ error }) => error instanceof DeleteCardCancelError,
})

const successRemoveToast: Toast = { type: "info", text: "Карта успешно удалена" }
forward({
  from: deleteCardFx.done.map(() => successRemoveToast),
  to: [toasts.remove, toasts.add, loadClientCardsFx.prepend(() => {})],
})

const failedRemoveToast: Toast = { type: "error", text: "Не удалось удалить карту" }
forward({
  from: cardDeleteError.map(() => failedRemoveToast),
  to: [toasts.remove, toasts.add],
})

export const $isLoading = some({ predicate: true, stores: [loadClientCardsFx.pending, deleteCardFx.pending] })

const $clientCards = restore<CardResponse[]>(
  loadClientCardsFx.doneData.map(data => data.results),
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
  deletedCard,
  null
)