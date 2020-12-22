import * as React from "react"
import styled from "styled-components"
import { WalletCard } from "@/pages/client/wallet/cards/WalletCard"
import { WalletAddCard } from "@/pages/client/wallet/cards/WalletAddCard"
import { SetCardList} from "@/pages/client/profile/content/credit-cards/CreditCards"

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    order: 0;
  }
`

const StyledWalletCard = styled(WalletCard)``

type CreditCardsProps = {
    list : SetCardList[]
    show: boolean
}

export const CreditCardsList = (props: CreditCardsProps) => {

  return (
    <>
      <CardsContainer>
        {props.list.map((card, index) => (
          <StyledWalletCard key={`${index}`} showed={props.show} {...card} />
        ))}
      </CardsContainer>
      {props.show || props.list.length === 0 ? <WalletAddCard /> : null}
    </>
  )
}