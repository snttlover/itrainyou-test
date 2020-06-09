import React from "react"
import styled from "styled-components"
import { Title } from "@/application/pages/coach/home/awaiting-approval /common/Title"
import { SubTitle } from "@/application/pages/coach/home/awaiting-approval /common/SubTitle"
import { Steps } from "./content/Steps"
import { Button } from "@/application/components/button/normal/Button"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MediaRange.lessThan(`tablet`)`
    padding-top: 132px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    padding-top: 36px;
  `}
`

const StyledTitle = styled(Title)`
  margin-bottom: 12px;
  ${MediaRange.lessThan(`mobile`)`
    margin-bottom: 8px;
  `}
`

const StyledSubTitle = styled(SubTitle)``

const StyledBottomSubtitle = styled(StyledSubTitle)`
  ${MediaRange.lessThan(`mobile`)`
    width: 248px;
  `}
`

const StyledButton = styled(Button)`
  width: 160px;
  margin-top: 28px;
  ${MediaRange.lessThan(`tablet`)`
    margin-top: 24px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 8px;
  `}
`

export const AwaitingApproval = () => (
  <Container>
    <StyledTitle>Ваша заявка ждет одобрения!</StyledTitle>
    <StyledSubTitle>В среднем заявка обрабатывается около 2 дней</StyledSubTitle>
    <Steps />
    <StyledBottomSubtitle>А пока можете сами пройти сессии как клиент</StyledBottomSubtitle>
    <StyledButton>Попробовать</StyledButton>
  </Container>
)
