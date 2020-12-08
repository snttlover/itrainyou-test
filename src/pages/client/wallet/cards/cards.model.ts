import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { CardResponse, getCardsList } from "@/lib/api/wallet/client/get-cards-list"
import { createGate } from "@/scope"
import { createEffect, createEvent, forward, restore, split, combine } from "effector-root"
import { deleteCard } from "@/lib/api/wallet/client/delete-card"
import { makeCardPrimary, MakeCardPrimaryResponse } from "@/lib/api/wallet/client/make-card-primary"
import { some } from "patronum"
import { coachByIdGate } from "@/pages/search/coach-by-id/coach-by-id.model"
class DeleteCardCancelError extends Error {}
const reset = createEvent()

export const CardsTabGate = createGate()

export const loadCardsFx = createEffect({
  handler: getCardsList,
})

forward({
  from: CardsTabGate.open,
  to: loadCardsFx,
})

/*forward({
  from: coachByIdGate.open,
  to: loadCardsFx,
})*/

const deleteCardFx = createEffect({
  handler: (id: number) => {
    if (confirm("Вы уверены что хотите удалить карту?")) {
      return deleteCard(id)
    } else {
      throw new DeleteCardCancelError()
    }
  },
})

const madeCardPrimaryFx = createEffect({
  handler: (id: number) => makeCardPrimary(id)
})

export const changeCurrentCard = createEvent<CardResponse>()
/*export const $currentCard = restore<string | number>(
  changeCurrentCard,
  ""
).reset(reset)*/

export const deletedCard = createEvent<number>()
export const madeCardPrimary = createEvent<number>()

forward({
  from: madeCardPrimary,
  to: madeCardPrimaryFx,
})

forward({
  from: deletedCard,
  to: deleteCardFx,
})

forward({
  from: madeCardPrimaryFx.done,
  to: loadCardsFx,
})

forward({
  from: loadCardsFx,
  to: changeCurrentCard.map(() => console.log("loadcardsFx"))
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

export const $primaryCard = combine($cards, (cards)=> {
  const primaryCard = cards.find(card => card.isPrimary)
  return primaryCard
})

export const $currentCard = $cards.map(cards => {
  const primaryCard = cards.find(card => card.isPrimary)
  return primaryCard
})

$currentCard.on(changeCurrentCard,(state,payload) => payload)

$cards.watch(res => console.log("cards",res))
$primaryCard.watch(res => console.log("primaryCard",res))
$currentCard.watch(res => console.log("currentCard",res))