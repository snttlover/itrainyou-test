import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import { Icon } from "@/components/icon/Icon"
import { WalletAddCard } from "@/pages/client/wallet/cards/WalletAddCard"
import { AddTinkoffCardDialog } from "@/pages/coach/home/tinkoff/AddCardDialog"

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
    font-family: Roboto Slab;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #75309E;
    margin-bottom: 24px;

    ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 24px;
  `}
`

const InterviewTitle = styled.div`
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    color: #424242;
    text-align: center;
    margin-bottom: 24px;

    ${MediaRange.lessThan("mobile")`
    font-size: 20px;
    line-height: 28px;
  `}
`


const LetterIcon = styled(Icon).attrs({ name: "ykassa-not-approved" })`
    width: 240px;
    height: 108px;
    margin-bottom: 40px;
    
    ${MediaRange.lessThan("mobile")`
    width: 200px;
    height: 90px;
  `}
`

const SubTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #5B6670;

    ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
  `}
`

const AddCardContainer = styled.div`
  max-width: 644px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;

  ${MediaRange.lessThan("mobile")`
    padding: 12px;
  `}
`

export const TinkoffApproved = () => {

  return (
    <>
      <AddTinkoffCardDialog />
      <Container>
        <Title>Вашу анкету одобрили!</Title>
        <LetterIcon />
        <InterviewTitle>Привяжите карту</InterviewTitle>
        <SubTitle>Для того, чтобы получать деньги на карту, привяжите карту.</SubTitle>
        <AddCardContainer>
          <WalletAddCard />
        </AddCardContainer>
      </Container>
    </>
  )
}