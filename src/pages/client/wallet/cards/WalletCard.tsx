import { deletedClientCard,deletedCoachCard, madeCoachCardPrimary, madeClientCardPrimary } from "@/pages/client/wallet/cards/cards.model"
import { useEvent } from "effector-react"
import styled from "styled-components"
import React from "react"
import { MediaRange } from "@/lib/responsive/media"

import MasterCard from "../img/MasterCard.svg"
import Visa from "../img/Visa.svg"

export const WalletCardContainer = styled.div`
  background: #ffffff;
  border: 1px solid #dbdee0;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 12px;
  width: 240px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-right: 12px;

  ${MediaRange.lessThan("mobile")`
    margin-right: 4px;
    font-size: 14px;
  `}
`

const ExpireDate = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.theme.colors.primary};
  margin-top: 8px;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DeleteBtn = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
  cursor: pointer;
`

const PrimaryBtn = styled.div<{
    isPrimary: boolean
    userType: "coach" | "client"
}>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ isPrimary, userType }) => {
    if (isPrimary) {
      if (userType === "client") {
        return "#4858CC"
      } else {
        return "#783D9D"
      }
    } else {
      return "#E1E6EA"
    }}};
  cursor: pointer;

  ${MediaRange.lessThan("mobile")`
    text-align: right;
  `}
`

const TypeImg = styled.img`
  width: 32px;
  height: 22px;
`

const Item = styled.div<{ showed: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: ${({ showed }) => showed ? "1px solid #efefef" : "none"};
    padding: 12px 0;
    padding-right: 16px;

    ${MediaRange.lessThan("mobile")`
        padding-right: 8px;
    `}
`

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

type WalletCardProps = {
    id: number
    type: string
    cardEnd: string
    expireDate: string
    isPrimary: boolean
    key: string
    showed: boolean
    userType: "coach" | "client"
    className?: string
}


export const WalletCard: React.FC<WalletCardProps> = ({ id, type, cardEnd, expireDate,isPrimary, className, key, showed , userType}) => {
  const deleteClientCard = useEvent(deletedClientCard)
  const makeClientCardPrimary = useEvent(madeClientCardPrimary)

  const deleteCoachCard = useEvent(deletedCoachCard)
  const makeCoachCardPrimary = useEvent(madeCoachCardPrimary)

  let cardTypeImg: string | null = null

  if (type === "MasterCard") cardTypeImg = MasterCard
  else if (type === "Visa") cardTypeImg = Visa

  const handleOnClick = () => {
    if (isPrimary) {
      return
    } else {
      userType === "client" ? makeClientCardPrimary(id) : makeCoachCardPrimary(id)
    }
  }

  const handleDeleteCard = () => {
    userType === "client" ? deleteClientCard(id) : deleteCoachCard(id)
  }

  return (
    <Item key={key} showed={showed}>
      <BottomRow>
        <LogosContainer>
          <Title>
            {type} •••• {cardEnd}
          </Title>
          {cardTypeImg && ( <TypeImg src={cardTypeImg} />)}
        </LogosContainer>
        <PrimaryBtn 
          isPrimary={isPrimary}
          userType={userType}
          onClick={handleOnClick}>
          {isPrimary ? "Основная" : "Сделать основной"}
        </PrimaryBtn>
      </BottomRow>
      <BottomRow>
        <ExpireDate>{expireDate}</ExpireDate>
        <DeleteBtn onClick={handleDeleteCard}>Удалить</DeleteBtn>
      </BottomRow>
    </Item>
  )
}