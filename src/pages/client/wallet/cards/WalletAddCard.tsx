import { Icon } from "@/components/icon/Icon"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { $cardsListForView, $isLoading } from "./cards.model"
import { useList, useStore, useEvent } from "effector-react"
import { WalletCard } from "./WalletCard"
import React from "react"
import styled from "styled-components"
import {
  addCard
} from "@/feature/client-funds-up/dialog/fund-up.model.ts"

const PlusIcon = styled(Icon).attrs({ name: "plus" })`
  width: 28px;
  height: 28px;
  fill: ${({ theme }) => theme.colors.primary};
`

const AddCardText = styled.p`
  margin-top: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #3746b0;
`

const StyledWalletCard = styled(WalletCard)``

const CardsContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 12px 60px 52px;

  ${StyledWalletCard} {
    margin-top: 24px;

    &:nth-child(2n) {
      margin-left: 24px;
    }
  }

  ${MediaRange.lessThan("mobile")`
    padding: 12px 32px 12px;
    align-items: center;
    justify-content: center;
    
    ${StyledWalletCard} {
      margin-top: 4px;
  
      &:nth-child(2n) {
        margin-left: unset;
      }
    }
  `}
`

const Placeholder = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  /* identical to box height, or 130% */

  text-align: center;

  /* средне-серый */

  color: #9aa0a6;
`

const WalletCardContainer = styled.div`
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

const Center = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WalletAddCard = () => {
  const isLoading = useStore($isLoading)
  const $cards = useStore($cardsListForView)
  const _addCard = useEvent(addCard)

  return (
  <WalletCardContainer>
    <div onClick={_addCard}>Удалить карту</div>
  </WalletCardContainer>
  )
}