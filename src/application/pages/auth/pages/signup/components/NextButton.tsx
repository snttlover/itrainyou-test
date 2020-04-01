import { MediaRange } from "@/application/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import arrow from "./next-arrow.svg"

const StyledButton = styled.button`
  width: 100px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #544274;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;

  &:disabled {
    opacity: 0.7;
  }

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const Arrow = styled.img.attrs({ src: arrow })`
  width: 24px;
  height: 24px;
  margin-left: 4px;
`

type NextButtonProps = {
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const NextButton = styled((props: NextButtonProps) => (
  <StyledButton type='submit' {...props}>
    Дальше <Arrow />
  </StyledButton>
))``
