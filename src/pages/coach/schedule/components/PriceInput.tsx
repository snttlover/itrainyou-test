import { Input, InputTypes } from "@/newcomponents/input/Input"
import { Loader } from "@/oldcomponents/spinner/Spinner"
import React from "react"
import styled from "styled-components"

const PriceContainer = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  max-width: none;
`

export const PriceInput: React.FC<InputTypes & { loading?: boolean }> = ({ loading, ...props }) => (
  <PriceContainer>
    <StyledInput {...{...props, loading, price: true}} />
  </PriceContainer>
)
