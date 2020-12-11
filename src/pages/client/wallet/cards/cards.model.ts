import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CardResponse, getCardsList } from "@/lib/api/wallet/client/get-cards-list"
import { createGate } from "@/scope"
import { createEffect, createEvent, forward, restore, split, guard } from "effector-root"
import { deleteCard } from "@/lib/api/wallet/client/delete-card"
import { makeCardPrimary } from "@/lib/api/wallet/client/make-card-primary"
import { some } from "patronum"
import { getCardSessions, getCardSessionsResponse } from "@/lib/api/wallet/client/get-card-sessions"
import { toggleDeleteCardModalDialog } from "@/pages/client/profile/profile-page.model"

class DeleteCardCancelError extends Error {}
const reset = createEvent()
export const deletedCard = createEvent<number>()
export const confirmDeleteCard = createEvent<number>()

export const CardsTabGate = createGate()

export const loadCardsFx = createEffect({
  handler: getCardsList,
})

export const getCardSessionsFx = createEffect({
  handler: getCardSessions,
})

forward({
  from: CardsTabGate.open,
  to: loadCardsFx,
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
  to: loadCardsFx,
})

forward({
  from: deletedCard,
  to: getCardSessionsFx,
})

forward({
  from: getCardSessionsFx.done,
  to: toggleDeleteCardModalDialog,
})

forward({
  from: confirmDeleteCard,
  to: deleteCardFx,
})

forward({
  from: deleteCardFx.done,
  to: toggleDeleteCardModalDialog,
})

const { canceledCardDelete, __: cardDeleteError } = split(deleteCardFx.fail, {
  canceledCardDelete: ({ error }) => error instanceof DeleteCardCancelError,
})

const successRemoveToast: Toast = { type: "info", text: "Карта успешно удалена" }
forward({
  from: deleteCardFx.done.map(() => successRemoveToast),
  to: [toasts.remove, toasts.add, loadCardsFx.prepend(() => {})],
})

const failedRemoveToast: Toast = { type: "error", text: "Не удалось удалить карту" }
forward({
  from: cardDeleteError.map(() => failedRemoveToast),
  to: [toasts.remove, toasts.add],
})

export const $isLoading = some({ predicate: true, stores: [loadCardsFx.pending, deleteCardFx.pending] })

const $cards = restore<CardResponse[]>(
  loadCardsFx.doneData.map(data => data.results),
  []
)

export const $cardsListForView = $cards.map(cards =>
  cards.map(card => ({
    id: card.id,
    type: card.cardType,
    cardEnd: card.lastFourDigits,
    expireDate: `${card.expiryMonth}/${card.expiryYear}`,
    isPrimary: card.isPrimary,
  }))
)

const $cardSessions = restore<getCardSessionsResponse[]>(
  getCardSessionsFx.doneData.map(data => data.results),
  []
)

export const $cardsSessionsForView = $cardSessions.map(sessions =>
  sessions.map(session => ({
    id: session.id,
    startDateTime: session.startDatetime,
    duration: session.duration,
    coach: session.coach,
  }))
)

export const cardIdForDelete = restore<number>(
  deletedCard,
  null
)

/*
avatar: session.coach.avatar,
    name: session.coach.name,
 */