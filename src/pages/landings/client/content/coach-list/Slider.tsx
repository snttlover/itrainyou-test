import React, { useRef } from "react"
import styled from "styled-components"

import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import { SwiperOptions } from "swiper"

import { Card } from "./Card"

const swiperOptions: SwiperOptions = {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 16,
}

const Wrapper = styled.section`
  width: 100%;
  height: 400px;
`

const SliderWrapper = styled.div`
  height: 400px;
  width: 100%;
  background: #fff;
  position: relative;

  .swiper-wrapper {
    width: 264px;
    height: 400px;
  }
`

type Props = {
  coaches: any[]
}

export const Slider = ({ coaches }: Props) => {
  const swiper = useRef<SwiperRefNode>(null)

  return (
    <Wrapper>
      <SliderWrapper>
        <ReactIdSwiper {...swiperOptions} ref={swiper}>
          {coaches.map(coach => (
            <Card key={coach.id} coach={coach} />
          ))}
        </ReactIdSwiper>
      </SliderWrapper>
    </Wrapper>
  )
}
