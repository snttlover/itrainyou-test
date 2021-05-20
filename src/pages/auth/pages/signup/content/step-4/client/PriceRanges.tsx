import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import { useState } from "react"
import { Checkbox, StyledCheckbox } from "@/oldcomponents/checkbox/Checkbox"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FFFFFF;
  padding: 27px;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-top: 24px;
  
  ${MediaRange.lessThan("mobile")`
    margin-top: 16px;
  `}
`

const StyledCheckBox = styled(Checkbox)`
    ${MediaRange.lessThan("mobile")`
    
    ${StyledCheckbox} {
        fill: #FFFFFF;
    }
  `}
`

export const PriceRanges = () => {
  const [checked, setChecked] = useState({id: -1})
  const options = [
    {
      label: "0 — 3000 ₽", value: "3000max"
    },
    {
      label: "3000 — 4999 ₽", value: "5000max"
    },
    {
      label: "5000 — 6999 ₽", value: "7000max"
    },
    {
      label: "7000 ₽ и выше", value: "7000min"
    }
  ]

  return (
    <Container>
      {options.map((option,index) =>
        <Checkbox key={index} value={checked.id === index} onChange={() => setChecked({id: index})}>
          {option.label}
        </Checkbox>
      )}
    </Container>
  )
}