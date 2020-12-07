import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { $cardsListForView } from "./cards.model"
import { useStore, useEvent } from "effector-react"
import React from "react"
import styled from "styled-components"
import {
  addCard
} from "@/feature/client-funds-up/dialog/fund-up.model.ts"
import MasterCard from "@/pages/client/wallet/img/MasterCard.svg"
import Visa from "@/pages/client/wallet/img/Visa.svg"
import { Button } from "@/components/button/normal/Button"


const PlusIcon = styled(Icon).attrs({ name: "plus" })`
  width: 10px;
  height: 10px;
  fill: ${({ theme }) => theme.colors.primary};
`

/*const AddCardContainer = styled.div<AddCardType>`
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
*/

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0;
  padding-right: 16px;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TypeImg = styled.img`
  width: 32px;
  height: 22px;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-right: 12px;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #4858CC;
`

const StyledButton = styled(Button)`
  background: #ffffff;
  border: 1px solid #4858CC;
`

export const WalletAddCard = () => {
  const $cards = useStore($cardsListForView)
  const _addCard = useEvent(addCard)

  const handleAddCard = (e: React.SyntheticEvent) => {
    console.log("ADDCARD")
    _addCard()
  }

  return (
    <Item>
      <BottomRow>
        <LogosContainer>
          <Title> Новая карта </Title>
          <TypeImg src={MasterCard} />
          <TypeImg src={Visa} />
        </LogosContainer>
        <StyledButton onClick={handleAddCard}><Text>Добавить карту <PlusIcon /></Text></StyledButton>
      </BottomRow>
    </Item>
  )
}


/*export const WalletAddCard = () => {
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
}*/