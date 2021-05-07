import * as React from "react"
import styled from "styled-components"
import grayArrow from "./images/gray-arrow.svg"
import { MediaRange } from "@/lib/responsive/media"
import { Icon } from "@/oldcomponents/icon/Icon"

const Container = styled.div`
  width: 100%;
  max-width: 784px;
  display: flex;
  margin-top: 106px;
  margin-bottom: 162px;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 20px;
    width: 164px;
  `}
`

const Step = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  ${MediaRange.lessThan("mobile")`
    width: 164px;
    height: 118px;
  `}
`

const StepTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  ${MediaRange.lessThan("tablet")`
    font-size: 12px;
    line-height: 16px;
  `}
  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 10px;
  `}
`

const CheckStepIcon = styled(Icon).attrs((props: any) => ({
  name: props.checkstep,
  ...props
}))`
    width: 64px;
    height: 64px;
`

const ArrowDelimiter = styled.div`
   width: 34px;
   background: url('${grayArrow}') center no-repeat;
   background-size: 8px 14px;
   ${MediaRange.lessThan("mobile")`
     transform: rotate(90deg);
     width: unset;
     height: 40px;
   `}
`

export const YandexRegisterSteps = styled(({ className }) => (
  <Container className={className}>
    <Step>
      <StepTitle>Эта заявка отправится супервизору</StepTitle>
      <CheckStepIcon checkstep={"checkstep1"} />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Супервизор одобрит вашу заявку</StepTitle>
      <CheckStepIcon checkstep={"checkstep2"} />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Вы зарегистрируетесь в ЮKassa</StepTitle>
      <CheckStepIcon checkstep={"checkstep3-yandex"} />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Вы получите доступ к платформе</StepTitle>
      <CheckStepIcon checkstep={"checkstep4"} />
    </Step>
  </Container>
))``

export const TinkoffRegisterSteps = styled(({ className }) => (
  <Container className={className}>
    <Step>
      <StepTitle>Эта заявка отправится супервизору</StepTitle>
      <CheckStepIcon checkstep={"checkstep1"} />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Супервизор одобрит вашу заявку</StepTitle>
      <CheckStepIcon checkstep={"checkstep2"} />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Вы привяжете карту</StepTitle>
      <CheckStepIcon checkstep={"checkstep3-tinkoff"} />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Вы получите доступ к платформе</StepTitle>
      <CheckStepIcon checkstep={"checkstep4"} />
    </Step>
  </Container>
))``
