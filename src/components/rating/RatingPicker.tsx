import * as React from "react"
import { Icon } from "#/components/icon/Icon"
import { MediaRange } from "#/lib/responsive/media"
import styled from "styled-components"
import { useState } from "react"

const StarsContainer = styled.div``

const Star = styled(Icon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  fill: ${props => props.theme.colors.primary};

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

type RatingProps = {
  value: number
  onChange?: (value: number) => void
}

export const RatingPicker = styled(({ value, ...props }: RatingProps) => {
  const [hovered, changeHovered] = useState(0)
  const current = hovered || value

  const change = (num: number) => {
    props.onChange && props.onChange(num)
  }

  const stars = Array.from({ length: 5 })
    .map((_, index) => index + 1)
    .map(num => {
      if (num <= current) {
        return <Star key={num} name='full-star' onMouseEnter={() => changeHovered(num)} onClick={() => change(num)} />
      }

      return <Star key={num} name='star' onMouseEnter={() => changeHovered(num)} onClick={() => change(num)} />
    })

  return (
    <StarsContainer onMouseLeave={() => changeHovered(0)}>
      {stars}
    </StarsContainer>
  )
})``
