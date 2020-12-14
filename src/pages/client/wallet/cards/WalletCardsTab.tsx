import { Icon } from "@/components/icon/Icon"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"
import { $cardsListForView, $isLoading } from "./cards.model"
import { useList, useStore } from "effector-react"
import { WalletCard, WalletCardContainer } from "./WalletCard"
import { WalletAddCard } from "./WalletAddCard"
import React from "react"
import styled from "styled-components"

const AddWalletContainer = styled(WalletCardContainer)`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

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

const StyledAddCard = styled(WalletAddCard)``

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

const Center = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WalletsCardsTab = () => {
  const isLoading = useStore($isLoading)
  const $cards = useStore($cardsListForView)

  return (
    <CardsContainer>
      {useList($cardsListForView, card => (
        <StyledWalletCard {...card} />
      ))}
      {/*$cards.length === 0 && !isLoading && (
        <Center>
          <Placeholder>Нет привязанных карт</Placeholder>
        </Center>
      )*/}
      {!isLoading && (
        <StyledAddCard />
      )}
      {isLoading && <Spinner />}
    </CardsContainer>
  )
}
