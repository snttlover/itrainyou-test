import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import { Icon } from "@/old-components/icon/Icon"
import { AddTinkoffCardDialog } from "@/pages/coach/home/tinkoff/AddCardDialog"
import { $coachCardsListForView } from "@/pages/client/wallet/cards/cards.model"
import { CreditCardsList } from "@/pages/client/profile/content/credit-cards/CreditCardsList"
import {useStore} from "effector-react"
import { finishSaveCoachCardFx } from "@/feature/client-funds-up/dialog/models/units"
import { Loader } from "@/old-components/spinner/Spinner"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"

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
    margin-bottom: 24px;

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

const StyledButton = styled(DashedButton)`
    font-size: 16px;
    line-height: 24px;
    width: 240px;
    padding: 2px 10px;
    margin-top: 40px;
    align-self: flex-end;
    
    ${MediaRange.lessThan("mobile")`
        padding: 2px 6px;
    `}
`

export const TinkoffApproved = () => {
  const isLoading = useStore(finishSaveCoachCardFx.pending)
  const cards = useStore($coachCardsListForView)

  return (
    <>
      <AddTinkoffCardDialog />
      <Container>
        <Title>???????? ???????????? ????????????????!</Title>
        <LetterIcon />
        <InterviewTitle>?????????????????? ??????????</InterviewTitle>
        <SubTitle>?????? ????????, ?????????? ???????????????? ???????????? ???? ??????????, ?????????????????? ??????????.</SubTitle>
        <AddCardContainer>
          {!isLoading ? <CreditCardsList list={cards} show={true} userType={"coach"} /> : <Loader />}
        </AddCardContainer>
        <StyledButton onClick={() => document.location.reload()} disabled={cards.length === 0}> ?????????????????? ??????????????????????</StyledButton>
      </Container>
    </>
  )
}