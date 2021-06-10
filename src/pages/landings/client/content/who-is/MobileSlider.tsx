import React, { useRef } from "react"
import styled from "styled-components"

import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import { SwiperOptions } from "swiper"

const swiperOptions: SwiperOptions = {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 16,
}

const Wrapper = styled.section`
  height: 98px;
`

const SliderWrapper = styled.div`
  height: 98px;
  width: 100%;
  background: #4858cc;
  position: relative;

  .swiper-wrapper {
    width: 208px;
    height: 98px;
  }
`

const Slide = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 208px;
  height: 98px;
  padding: 16px;

  &:first-child {
    margin-left: 16px;
  }

  &:last-child {
    margin-right: 16px;
  }
`

const SlideText = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

type Props = {
  items: string[]
}

export const MobileSlider = ({ items }: Props) => {
  const swiper = useRef<SwiperRefNode>(null)

  return (
    <Wrapper>
      <SliderWrapper>
        <ReactIdSwiper {...swiperOptions} ref={swiper}>
          {items.map((item, index) => (
            <Slide key={index}>
              <SlideText dangerouslySetInnerHTML={{ __html: item }} />
            </Slide>
          ))}
        </ReactIdSwiper>
      </SliderWrapper>
    </Wrapper>
  )
}
