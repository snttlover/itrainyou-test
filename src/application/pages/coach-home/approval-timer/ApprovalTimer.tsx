import { updateTime } from "@/application/pages/coach-home/coach-home.model"
import { useEffect } from "react"
import styled from "styled-components"
import { Title } from "@/application/pages/coach-home/awaiting-approval /common/Title"
import { SubTitle } from "@/application/pages/coach-home/awaiting-approval /common/SubTitle"
import { Button } from "@/application/components/button/normal/Button"
import { MediaRange } from "@/application/lib/responsive/media"
import { Timer } from "@/application/pages/coach-home/approval-timer/content/Timer"

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
  max-width: 600px;
  ${MediaRange.lessThan(`mobile`)`
    max-width: 296px;
  `}
`

const StyledBottomSubtitle = styled(SubTitle)`
  ${MediaRange.lessThan(`mobile`)`
    width: 100%;
    max-width: 248px;
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

const LearnHere = styled.div`
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

export const ApprovalTimer = () => {
  useEffect(() => {
    const timer = setInterval(() => updateTime(), 1000)

    return () => clearInterval(timer)
  })

  return (
    <Container>
      <StyledTitle>К сожалению, ваша заявка не прошла</StyledTitle>
      <StyledSubTitle>
        Вы нам понравились, но пока нам кажется, что вам надо чуть-чуть подучиться. Попробуйте повторить попытку через
        90 дней.
      </StyledSubTitle>
      <Timer />
      <LearnHere>Здесь можно подучиться!</LearnHere>
      <StyledBottomSubtitle>Мы будем рады видеть вас в виде нашего клиента</StyledBottomSubtitle>
      <StyledButton>Попробовать</StyledButton>
    </Container>
  )
}
