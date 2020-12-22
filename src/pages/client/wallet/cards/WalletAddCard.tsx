import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent } from "effector-react"
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

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${MediaRange.lessThan("mobile")`
    
  `}
`

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0;
  padding-right: 16px;

  ${MediaRange.lessThan("mobile")`
    padding-right: 0;
  `}
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    align-items: flex-start;
  `}
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
const MobileGroup = styled.div`

  ${MediaRange.lessThan("mobile")`
    display:flex;
    width: 100%;
    justify-content: flex-end;
  `}
`
const StyledButton = styled(Button)`
  background: #ffffff;
  border: 1px solid #4858CC;
`

export const WalletAddCard = () => {
  const _addCard = useEvent(addCard)

  const handleAddCard = (e: React.SyntheticEvent) => {
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
        <MobileGroup>
          <StyledButton onClick={handleAddCard}><Text>Добавить карту <PlusIcon /></Text></StyledButton>
        </MobileGroup>
      </BottomRow>
    </Item>
  )
}