import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { $cardsListForView } from "./cards.model"
import { useStore, useEvent } from "effector-react"
import React from "react"
import styled from "styled-components"
import {
  addCard
} from "@/feature/client-funds-up/dialog/fund-up.model.ts"


const PlusIcon = styled(Icon).attrs({ name: "plus" })`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`

const AddCardText = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: #3746B0;
`
type AddCardType = { marginLeft: number }

const AddCardContainer = styled.div<AddCardType>`
  background: #ffffff;
  border: 1px solid #dbdee0;
  box-sizing: border-box;
  border-radius: 12px;
  width: 240px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 24px;
  margin-left: ${props => (props.marginLeft % 2) > 0 ? "24px" : ""};
  
  ${MediaRange.lessThan("mobile")`
    margin-top: 4px;
    margin-left: ${props => (props.marginLeft % 2) > 0 ? "4px" : ""};
  `}
`

const Center = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const TextContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const WalletAddCard = () => {
  const $cards = useStore($cardsListForView)
  const _addCard = useEvent(addCard)

  const handleAddCard = (e: React.SyntheticEvent) => {
    console.log("ADDCARD")
    _addCard()
  }

  return (
    <AddCardContainer marginLeft={$cards.length} onClick={handleAddCard}>
      <Center>
        <PlusIcon />
      </Center>
      <TextContainer>
        <AddCardText>Добавить карту</AddCardText>
      </TextContainer>
    </AddCardContainer>
  )
}