import * as React from "react"
import styled from "styled-components"
import { CreditCardsList } from "./CreditCardsList"
import { MediaRange } from "@/lib/responsive/media"
import arrowIcon from "@/old-components/coach-card/images/arrow.svg"
import { useEffect, useState } from "react"
import { useStore } from "effector-react"
import { Loader } from "@/old-components/spinner/Spinner"
import { $clientCardsListForView, $coachCardsListForView } from "@/pages/client/wallet/cards/cards.model"
import { finishSaveClientCardFx, finishSaveCoachCardFx } from "@/feature/client-funds-up/dialog/models/units"


export type SetCardList = {
    id: number
    type: string
    cardEnd: string
    expireDate: string
    isPrimary: boolean
}

const Container = styled.div<{userType: "client" | "coach"}>`
  padding-right: ${({userType}) => userType === "client" ? "140px" : "0"};
  width: 100%;
  margin-top: 32px;
  position: relative;
  max-width: 790px;
  ${MediaRange.lessThan("tablet")`
    padding-right: unset;
  `}

  ${MediaRange.lessThan("mobile")`
    padding-right: 0;
    margin-top: 16px;
  `}
`

const Cards = styled.div`
  max-width: 650px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;
    
    ${MediaRange.lessThan("mobile")`
    padding: 12px;
  `}
`
type ArrowType = { reverse?: boolean }

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.lessThan("mobile")`
     font-size: 16px;
     line-height: 26px;
  `}
`

const Arrow = styled.img.attrs<ArrowType>({ src: arrowIcon })`
  margin-left: 13px;
  width: 14px;
  height: 14px;
  cursor: pointer;
  ${({ reverse }: ArrowType) => reverse && "transform: rotate(180deg)"}
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`

type CardType = {
    id: number
    type: string
    cardEnd: string
    expireDate: string
    isPrimary: boolean
}

export const ProfileCreditCards = (props: {userType: "client" | "coach"}) => {
  let cards: CardType[]
  props.userType === "client" ? cards = useStore($clientCardsListForView) : cards = useStore($coachCardsListForView)
  const [isShowed, changeIsShow] = useState(false)
  const [cardList, setCardList] = useState<SetCardList[]>([])
  let isLoading: boolean
  props.userType === "client" ? isLoading = useStore(finishSaveClientCardFx.pending) : isLoading = useStore(finishSaveCoachCardFx.pending)

  const toggleCards = (e: React.SyntheticEvent) => {
    if (isShowed) {
      if (cards.length > 0) {
        const primaryCard = cards.find((card: CardType) => card.isPrimary) || cards[0]
        setCardList([primaryCard])
      }
      else {
        setCardList(cards)
      }
    }
    else {
      const primaryCard = cards.find((card: CardType) => card.isPrimary)
      if (primaryCard) {
        const changedArrayOfCards = cards
        changedArrayOfCards.splice(cards.indexOf(primaryCard), 1)
        changedArrayOfCards.unshift(primaryCard)
        setCardList(changedArrayOfCards)
      }
      else {
        setCardList(cards)
      }
    }
    changeIsShow(!isShowed)
  }

  useEffect(() => {
    if (cards.length > 0) {
      if (cards.length === cardList.length) {
        const primaryCard = cards.find((card: CardType) => card.isPrimary)
        const newCardList = cardList.map(card => (primaryCard && card.id === primaryCard.id ? {
          ...card,
          isPrimary: true
        } : {...card, isPrimary: false}))
        isShowed ? setCardList(newCardList) : (primaryCard ? setCardList([primaryCard]) : setCardList([cards[0]]))
      } else {
        const primaryCard = cards.find((card: CardType) => card.isPrimary) || cards[0]
        isShowed ? setCardList(cards) : setCardList([primaryCard])
      }
    }
    else {
      setCardList(cards)
    }
    changeIsShow(isShowed)
  },[cards])

  return (
    <Container userType={props.userType}>
      {!isLoading ?
        <Cards>
          <TitleContainer>
            <Title>?????????????????????? ??????????</Title>
            <Arrow reverse={isShowed} onClick={toggleCards} />
          </TitleContainer>
          <CreditCardsList list={cardList} show={isShowed} userType={props.userType} />
        </Cards>
        : <Loader /> }
    </Container>
  )
}