import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import { useState } from "react"
import { Checkbox, StyledCheckbox } from "@/oldcomponents/checkbox/Checkbox"
import { priceRangesGate, $priceRanges, selectPriceRange } from "@/pages/auth/pages/signup/models/units"
import { useGate, useStore, useEvent } from "effector-react"


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

export const PriceRanges = () => {
  const options = useStore($priceRanges)
  const selectRange = useEvent(selectPriceRange)


  useGate(priceRangesGate)

  return (
    <Container>
      {options.map((option,index) =>
        <Checkbox key={index} value={option.selected} color={"#4858CC"} filled onChange={() => selectRange({id: option.id})}>
          {option.rangeTo ? `${option.rangeFrom} - ${option.rangeTo}  ₽` : `${option.rangeFrom} и выше`}
        </Checkbox>
      )}
    </Container>
  )
}