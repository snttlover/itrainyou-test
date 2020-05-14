import { Icon } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"
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
  const nameByType = {
    empty: "star",
    half: "half-star",
    full: "full-star"
  }
  return (
    <StarsContainer {...props}>
      <Star name='full-star' />
      <Star name='full-star' />
      <Star name='full-star' />
      <Star name='half-star' />
      <Star name='star' />
    </StarsContainer>
  )
})``
