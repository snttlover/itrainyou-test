import { Icon } from "#/components/icon/Icon"
import { MediaRange } from "#/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Arrow = styled(Icon).attrs({ name: "arrow" })`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  transform: rotate(-90deg);
  fill: #ffffff;
`

const WhiteButton = styled.button`
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;

  &:disabled,
  &:disabled + ${Arrow} {
    color: #9aa0a6;
    ${Arrow} {
      fill: #9aa0a6;
    }
  }

  &:hover {
    color: #eceff1;
    ${Arrow} {
      fill: #eceff1;
    }
  }
`

const StyledButton = styled(WhiteButton)`
  ${MediaRange.greaterThan("mobile")`
    color: #4858CC;
    ${Arrow} {
      fill: #4858CC;
    }
    
    &:disabled,
    &:disabled + ${Arrow} {
      color: #EFEFEF;
      ${Arrow} {
        fill: #EFEFEF;
      }
    }
    
    &:hover {
      color: #3746B0;
      ${Arrow} {
        fill: #3746B0;
      }
    }
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

export const WhiteNextButton = styled((props: NextButtonProps) => (
  <WhiteButton type='submit' {...props}>
    дальше <Arrow />
  </WhiteButton>
))``
