import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CardResponse, getCardsList } from "@/lib/api/wallet/client/get-cards-list"
import { createGate } from "@/scope"
import { createEffect, createEvent, forward, restore, split } from "effector-root"
import { deleteCard } from "@/lib/api/wallet/client/delete-card"
import { some } from "patronum"

class DeleteCardCancelError extends Error {}

export const CardsTabGate = createGate()

export const loadCardsFx = createEffect({
  handler: getCardsList,
})

forward({
  from: CardsTabGate.open,
  to: loadCardsFx,
})

const deleteCardFx = createEffect({
  handler: (id: number) => {
    if (confirm("Вы уверены что хотите удалить карту?")) {
      return deleteCard(id)
    } else {
      throw new DeleteCardCancelError()
    }
  },
})

export const deletedCard = createEvent<number>()

forward({
  from: deletedCard,
  to: deleteCardFx,
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

export const $isLoading = some(true, [loadCardsFx.pending, deleteCardFx.pending])

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
  }))
)
