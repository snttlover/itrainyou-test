import { Input, InputTypes } from "@/new-components/input/Input"
import React from "react"
import styled from "styled-components"

const PriceContainer = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  max-width: none;
`

// ToDo: deprecated, удалить
export const PriceInput: React.FC<InputTypes & { loading?: boolean }> = ({ loading, ...props }) => (
  <PriceContainer>
    <StyledInput {...{...props, loading, price: true}} />
  </PriceContainer>
)
