import { Icon } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #FFFFFF;
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
    color: #5B6670;
  `}
`

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  transform: rotate(-90deg);
  fill: #FFFFFF;
  
  ${MediaRange.greaterThan("mobile")`
    fill: #5B6670;
  `}
`

type NextButtonProps = {
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const NextButton = styled((props: NextButtonProps) => (
  <StyledButton type='submit' {...props}>
    дальше <Arrow />
  </StyledButton>
))``
