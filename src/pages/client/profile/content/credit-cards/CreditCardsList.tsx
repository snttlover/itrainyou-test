import * as React from "react"
import styled from "styled-components"
import { useList } from "effector-react"
import { $cardsListForView } from "@/pages/client/wallet/cards/cards.model"
import { WalletCard } from "@/pages/client/wallet/cards/WalletCard"
import { WalletAddCard } from "@/pages/client/wallet/cards/WalletAddCard"

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    order: 0;
  }
`

const StyledWalletCard = styled(WalletCard)``

export const CreditCardsList = () => {

  return (
    <>
      <CardsContainer>
        {useList($cardsListForView, card => (
          <StyledWalletCard {...card} />
        ))}
      </CardsContainer>
      <WalletAddCard />
    </>
  )
}