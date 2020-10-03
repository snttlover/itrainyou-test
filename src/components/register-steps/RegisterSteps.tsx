import * as React from "react"
import styled from "styled-components"
import star from "./images/star.svg"
import smile from "./images/smile.svg"
import checkbox from "./images/checkbox.svg"
import grayArrow from "./images/gray-arrow.svg"
import { MediaRange } from "#/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  margin-top: 106px;
  margin-bottom: 162px;
  ${MediaRange.lessThan(`mobile`)`
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 20px;
    width: 164px;
  `}
`

const Step = styled.div`
  width: 164px;
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;

  border: 1px solid #dbdee0;
  border-radius: 4px;
  flex: 1;
  padding: 16px 12px;
  ${MediaRange.lessThan(`mobile`)`
    width: 164px;
    height: 96px;
    padding-bottom: 10px;
  `}
`

const StepTitle = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #424242;
  ${MediaRange.lessThan(`tablet`)`
    font-size: 12px;
    line-height: 16px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 10px;
  `}
`

const Star = styled.img.attrs({ src: star })`
  width: 20px;
  height: 20px;
`

const Checkbox = styled.img.attrs({ src: checkbox })`
  width: 20px;
  height: 20px;
`

const Smile = styled.img.attrs({ src: smile })`
  width: 20px;
  height: 20px;
`

const ArrowDelimiter = styled.div`
   width: 54px;
   background: url('${grayArrow}') center no-repeat;
   background-size: 8px 14px;
   ${MediaRange.lessThan(`mobile`)`
     transform: rotate(90deg);
     width: unset;
     height: 40px;
   `}
`

export const RegisterSteps = styled(({ className }) => (
  <Container className={className}>
    <Step>
      <StepTitle>Эта заявка отправится супервизору</StepTitle>
      <Star />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Супервизор одобрит вашу заявку</StepTitle>
      <Checkbox />
    </Step>
    <ArrowDelimiter />
    <Step>
      <StepTitle>Эта анкета будет видна клиентам (кроме контактов) </StepTitle>
      <Smile />
    </Step>
  </Container>
))``
