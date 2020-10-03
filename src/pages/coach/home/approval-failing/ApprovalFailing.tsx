import { navigatePush } from "#/feature/navigation"
import { routeNames } from "#/pages/route-names"
import { useEvent } from "effector-react/ssr"
import styled from "styled-components"
import { Title } from "#/pages/coach/home/awaiting-approval/common/Title"
import { SubTitle } from "#/pages/coach/home/awaiting-approval/common/SubTitle"
import { Button } from "#/components/button/normal/Button"
import { MediaRange } from "#/lib/responsive/media"
import peoples from "./images/peoples.svg"
import * as React from "react"

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
    width: 288px;
  `}
`

const StyledSubTitle = styled(SubTitle)`
  width: 100%;
  max-width: 362px;
  ${MediaRange.lessThan(`mobile`)`
    max-width: 246px;
  `}
`

const StyledBottomSubtitle = styled(SubTitle)`
  ${MediaRange.lessThan(`mobile`)`
    display: none;
  `}
`

const StyledBottomMobileSubtitle = styled(SubTitle)`
  display: none;
  ${MediaRange.lessThan(`mobile`)`
    display: block;
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

const Peoples = styled.img.attrs({ src: peoples })`
  width: 109.08px;
  height: 144.37px;
  margin-top: 76px;
  margin-bottom: 109px;
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 69px;
    margin-bottom: 106px;
  `}
`

const But = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  margin-bottom: 16px;
  ${MediaRange.lessThan(`mobile`)`
    display: none;
  `}
`

export const ApprovalFailing = () => {
  const navigate = useEvent(navigatePush)
  return (
    <Container>
      <StyledTitle>К сожалению, ваша заявка не прошла</StyledTitle>
      <StyledSubTitle>Мы очень заботимся о качестве наших коучей, и к сожалению, вы нам не подходите</StyledSubTitle>
      <Peoples />
      <StyledBottomMobileSubtitle>А пока можете сами пройти сессии как клиент</StyledBottomMobileSubtitle>
      <But>Но!</But>
      <StyledBottomSubtitle>Мы будем рады видеть вас в виде нашего клиента</StyledBottomSubtitle>
      <StyledButton onClick={() => navigate({ url: routeNames.client() })}>Попробовать</StyledButton>
    </Container>
  )
}
