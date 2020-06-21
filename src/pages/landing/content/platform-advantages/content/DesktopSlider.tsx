import {
  AdvantageSlide,
  AdvantageSlideTypes
} from "@/pages/landing/content/platform-advantages/content/AdvantageSlide"
import * as React from "react"
import styled from "styled-components"

const StyledSlide = styled(AdvantageSlide)`
  @media screen and (max-width: 638px) {
    display: none;
  }
`

export const DesktopSlider = (props: AdvantageSlideTypes) => <StyledSlide {...props} />
