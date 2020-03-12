import * as React from "react"
import styled from "styled-components"
import { RadioGroup, RadioOption } from "@/application/components/radio/Radio"
import { useState } from "react"
import { Calendar } from "@/application/components/calendar/Calendar"

const Container = styled.div`
  padding-top: 16px;
`

const Header = styled.div`
  font-size: 16px;
  line-height: 22px;
`

const Text = styled.div`
  margin-top: 8px;
  margin-bottom: 18px;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

const StyledRadioOption = styled(RadioOption)``

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${StyledRadioOption} {
    margin-bottom: 16px;
  }
`

export const DateFilter = () => {
  const [date, changeDate] = useState(new Date())
  const [rangeType, changeRangeType] = useState("from")
  return (
    <Container>
      <Header>Даты</Header>
      <Text>с 21 апр до 24 апр</Text>
      <RadioContainer>
        <RadioGroup value={rangeType} onChange={changeRangeType} name='date-range-type'>
          <StyledRadioOption value='from'>От</StyledRadioOption>
          <StyledRadioOption value='to'>До</StyledRadioOption>
          <StyledRadioOption value='range'>Промежуток</StyledRadioOption>
        </RadioGroup>
        <Calendar value={date} onChange={changeDate} />
      </RadioContainer>
    </Container>
  )
}
