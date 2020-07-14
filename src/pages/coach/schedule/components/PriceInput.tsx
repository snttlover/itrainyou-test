import { Input, InputTypes } from "@/components/input/Input"
import React from "react"
import styled from "styled-components"

const PriceContainer = styled.div`
  position: relative;
`

const RubbleSign = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  color: #9aa0a6;
  transform: translate(0, -50%);
`

export const PriceInput: React.FC<InputTypes> = ({ ...props }) => (
  <PriceContainer>
    <Input {...props} />
    <RubbleSign>₽</RubbleSign>
  </PriceContainer>
)
