import React, { useRef } from "react"
import styled from "styled-components"
import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import { SwiperOptions } from "swiper"

import { content } from "./publications/content"

import arrowLeftIcon from "@/pages/landing-coach/assets/publications/arrow-left.svg"

const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: ".photos__next-button",
    prevEl: ".photos__prev-button",
  },
  loop: true,
  slidesPerView: 1,
}

const Wrapper = styled.section`
  background: #4858cc;
  height: 460px;

  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 80px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 120px;
  }
`

const SliderWrapper = styled.div`
  height: 460px;
  width: 100%;
  background: #4858cc;
  position: relative;

  .swiper-container {
    width: 100%;
    height: 460px;
    background: #4858cc;
  }
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  margin-bottom: 16px;
`

const Slide = styled.div`
  text-align: center;
  font-size: 18px;
  background: #4858cc;
  position: relative;
  padding-top: 44px;
  height: 460px;
`

const SliderTitle = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-decoration-line: underline;
  color: #ffffff;

  margin: 0 auto;
`

const SlideImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 224px;
  border-radius: 8px 8px 0px 0px;
`

const Button = styled.div`
  position: absolute;
  z-index: 3;
  width: 24px;
  height: 24px;
  bottom: 148px;
  background: url("${arrowLeftIcon}");
`

const PrevButton = styled(Button)`
  left: 16px;
`
const NextButton = styled(Button)`
  right: 16px;
  transform: rotate(180deg);
`

export const Publications = () => {
  const swiper = useRef<SwiperRefNode>(null)

  return (
    <Wrapper>
      <SliderWrapper>
        <ReactIdSwiper {...swiperOptions} ref={swiper}>
          {content.map(item => (
            <Slide key={item.id}>
              <SliderTitle href={item.sourceURL} target='_blank'>
                {item.source}
              </SliderTitle>
              <SlideImage src={item.imageMobile} />
            </Slide>
          ))}
        </ReactIdSwiper>
        <PrevButton className='photos__prev-button' onClick={() => swiper.current?.swiper?.slidePrev()} />
        <NextButton className='photos__next-button' onClick={() => swiper.current?.swiper?.slideNext()} />
      </SliderWrapper>
    </Wrapper>
  )
}
