import { Input, InputTypes } from "#/components/input/Input"
import { Loader } from "#/components/spinner/Spinner"
import React from "react"
import styled from "styled-components"

const PriceContainer = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  width: 100%;
`

const RubbleSign = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  color: #9aa0a6;
  transform: translate(0, -50%);
  user-select: none;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
`

const StyledLoader = styled(Loader)`
  width: 100px;
  height: 100px;
  position: relative;
  right: -40px;
`

export const PriceInput: React.FC<InputTypes & { loading?: boolean }> = ({ loading, ...props }) => (
  <PriceContainer>
    <StyledInput {...props} />
    <RubbleSign>{loading ? <StyledLoader /> : "₽"}</RubbleSign>
  </PriceContainer>
)
