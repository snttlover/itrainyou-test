import { deletedCard, madeCardPrimary } from "@/pages/client/wallet/cards/cards.model"
import { useEvent } from "effector-react"
import styled from "styled-components"
import React from "react"

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
`

const ExpireDate = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #4858cc;
  margin-top: 8px;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const PrimaryBtn = styled.div<{ isPrimary: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${({ isPrimary }) => isPrimary ? "#4858CC" : "#E1E6EA"};
  cursor: pointer;
`

const TypeImg = styled.img`
  width: 32px;
  height: 22px;
`

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  padding: 12px 0;
  padding-right: 16px;
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
  className?: string
}

export const WalletCard: React.FC<WalletCardProps> = ({ id, type, cardEnd, expireDate,isPrimary, className }) => {
  const deleteCard = useEvent(deletedCard)
  const makeCardPrimary = useEvent(madeCardPrimary)
  let cardTypeImg: string | null = null

  if (type === "MasterCard") cardTypeImg = MasterCard
  else if (type === "Visa") cardTypeImg = Visa

  return (
    <Item>
      <BottomRow>
        <LogosContainer>
          <Title>
            {type} •••• {cardEnd}
          </Title>
          {cardTypeImg && ( <TypeImg src={cardTypeImg} />)}
        </LogosContainer>
        <PrimaryBtn 
          isPrimary={isPrimary} 
          onClick={() => makeCardPrimary(id)}>
          {isPrimary ? "Основная" : "Сделать основной"}
        </PrimaryBtn>
      </BottomRow>
      <BottomRow>
        <ExpireDate>{expireDate}</ExpireDate>
        <DeleteBtn onClick={() => deleteCard(id)}>Удалить</DeleteBtn>
      </BottomRow>
    </Item>
  )
}