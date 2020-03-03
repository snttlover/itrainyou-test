import * as React from "react"
// @ts-ignore
import Carousel from "react-multi-carousel"

import {
  AdvantageSlideTypes,
  AdvantageSlide
} from "@/application/pages/landing/content/platform-advantages/content/AdvantageSlide"

import { StyledCarousel } from "./CarouselStyled"
import { useEffect } from "react"

type MobileSliderProps = {
  items: AdvantageSlideTypes[]
  current: number,
  slideChanged: (slide: number) => void
}

const responsive = {
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
}

export const MobileSlider = (props: MobileSliderProps) => {
  let carousel: any = null

  useEffect(() => {
    if (carousel && carousel.goToSlide) {
      carousel.goToSlide(props.current)
    }
  })

  return (
    <StyledCarousel>
      <Carousel
        ref={(el: any) => (carousel = el)}
        responsive={responsive}
        ssr={true}
        afterChange={(_, current: any ) => {
          props.slideChanged(current.currentSlide)
        }}
      >
        {props.items.map((item, i) => (
          <AdvantageSlide key={i} {...item} />
        ))}
      </Carousel>
    </StyledCarousel>
  )
}
