import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { useEvent } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { Title } from "@/pages/coach/home/awaiting-approval/common/Title"
import { SubTitle } from "@/pages/coach/home/awaiting-approval/common/SubTitle"
import { RegisterSteps } from "@/components/register-steps/RegisterSteps"
import { Button } from "@/components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MediaRange.lessThan("tablet")`
    padding-top: 132px;
  `}
  ${MediaRange.lessThan("mobile")`
    padding-top: 36px;
  `}
`

const StyledTitle = styled(Title)`
  margin-bottom: 12px;
  ${MediaRange.lessThan("mobile")`
    margin-bottom: 8px;
  `}
`

const StyledSubTitle = styled(SubTitle)`
  ${MediaRange.lessThan("mobile")`
    width: 246px;
  `}
`

const StyledBottomSubtitle = styled(StyledSubTitle)`
  ${MediaRange.lessThan("mobile")`
    width: 248px;
  `}
`

const StyledButton = styled(Button)`
  width: 136px;
  margin-top: 28px;
  padding: 9px 24px;
  
  ${MediaRange.lessThan("tablet")`
    margin-top: 24px;
  `}
  ${MediaRange.lessThan("mobile")`
    margin-top: 8px;
  `}
`

export const AwaitingApproval = () => {
  const navigate = useEvent(navigatePush)
  return (
    <Container>
      <StyledTitle>Ваша заявка ждет одобрения!</StyledTitle>
      <StyledSubTitle>В среднем заявка обрабатывается около суток</StyledSubTitle>
      <RegisterSteps />
      <StyledBottomSubtitle>А пока можете сами пройти сессии как клиент</StyledBottomSubtitle>
      <StyledButton onClick={() => navigate({ url: routeNames.client() })}>Попробовать</StyledButton>
    </Container>
  )
}
