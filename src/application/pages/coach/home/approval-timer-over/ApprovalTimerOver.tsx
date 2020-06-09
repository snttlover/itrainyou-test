import { updateRegistrationFx } from "@/application/pages/coach/home/coach-home.model"
import styled from "styled-components"
import { Title } from "@/application/pages/coach/home/awaiting-approval /common/Title"
import { SubTitle } from "@/application/pages/coach/home/awaiting-approval /common/SubTitle"
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
    margin-top: 16px;
  `}
`

const LearnHere = styled.div`
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #424242;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 114px;
  margin-bottom: 148px;
`

const LeaveARequest = styled.div`
  font-family: Roboto Slab;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #424242;
`

const TryLink = styled.div`
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #7d36a8;
  margin-top: 4px;
  ${MediaRange.lessThan(`mobile`)`
     margin-top: 16px;
  `}
`

const TimeIsOver = styled(StyledSubTitle)`
  margin-bottom: 8px;
`

export const ApprovalTimerOver = () => (
  <Container>
    <StyledTitle>К сожалению, ваша заявка не прошла</StyledTitle>
    <StyledSubTitle>
      Вы нам понравились, но пока нам кажется, что вам надо чуть-чуть подучиться. Попробуйте повторить попытку через 90
      дней.
    </StyledSubTitle>
    <Content>
      <TimeIsOver>90 дней прошли!</TimeIsOver>
      <LeaveARequest>Отправьте заявку еще раз!</LeaveARequest>
      <StyledButton onClick={() => updateRegistrationFx()}>Оставить заявку</StyledButton>
    </Content>
    <LearnHere>Здесь можно подучиться!</LearnHere>
    <TryLink>Попробовать</TryLink>
  </Container>
)