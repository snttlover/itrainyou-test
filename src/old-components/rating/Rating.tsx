import * as React from "react"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import styled from "styled-components"

const StarsContainer = styled.div``

const Star = styled(Icon)`
  width: 16px;
  height: 16px;
  fill: #4858cc;

  ${MediaRange.greaterThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

type RatingProps = {
  value: number
}

export const Rating = styled(({ value, ...props }: RatingProps) => {
  const stars = Array.from({ length: 5 })
    .map((_, index) => index + 1)
    .map(num => {
      const isFull = value >= num
      const isHalf = num - value > 0 && num - value < 1

      if (isHalf) return <Star key={num} name='half-star' />
      if (isFull) return <Star key={num} name='full-star' />
      return <Star key={num} name='star' />
    })

  return <StarsContainer {...props}>{stars}</StarsContainer>
})``
