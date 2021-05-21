import React, { useRef } from "react"
import styled from "styled-components"
import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import { SwiperOptions } from "swiper"

import { content } from "./publications/content"

import { Container } from "../common/Container"

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
    height: 492px;

    margin-bottom: 80px;
  }

  @media (min-width: 1140px) {
    height: 640px;

    margin-bottom: 120px;
  }
`

const StyledContainer = styled(Container)`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  pointer-events: none;

  padding-top: 44px;
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

  @media (min-width: 768px) {
    font-size: 32px;
    line-height: 44px;
  }
`

const ArrowButton = styled.div`
  position: absolute;
  z-index: 5;
  width: 24px;
  height: 24px;
  bottom: 148px;
  background: url("${arrowLeftIcon}");
  background-size: 24px 24px;
  pointer-events: all;
  cursor: pointer;

  @media (min-width: 768px) {
    bottom: 130px;
    width: 44px;
    height: 44px;
    background-size: 44px 44px;
  }

  @media (min-width: 1140px) {
    bottom: 200px;
  }
`

const PrevButton = styled(ArrowButton)`
  left: 0;
`
const NextButton = styled(ArrowButton)`
  right: 0;
  transform: rotate(180deg);
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

  @media (min-width: 768px) {
    height: 492px;

    .swiper-container {
      height: 492px;
    }
  }

  @media (min-width: 1140px) {
    height: 640px;

    .swiper-container {
      height: 640px;
    }
  }
`

const Slide = styled.div`
  text-align: center;
  font-size: 18px;
  background: #4858cc;
  position: relative;
  padding-top: 92px;
  height: 460px;

  @media (min-width: 768px) {
    padding-top: 112px;
    height: 492px;
  }

  @media (min-width: 1140px) {
    padding-top: 120px;
    height: 640px;
  }
`

const SlideTitle = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  text-decoration-line: underline;
  color: #ffffff;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`

const SlideImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px 8px 0px 0px;
`

const SlideImageMobile = styled(SlideImage)`
  width: 224px;

  @media (min-width: 768px) {
    display: none;
  }
`

const SlideImageDesktop = styled(SlideImage)`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 596px;
  }

  @media (min-width: 1140px) {
    width: 905px;
  }
`

export const Publications = () => {
  const swiper = useRef<SwiperRefNode>(null)

  return (
    <Wrapper>
      <SliderWrapper>
        <ReactIdSwiper {...swiperOptions} ref={swiper}>
          {content.map(item => (
            <Slide key={item.id}>
              <SlideTitle href={item.sourceURL} target='_blank'>
                {item.source}
              </SlideTitle>
              <SlideImageMobile src={item.imageMobile} />
              <SlideImageDesktop src={item.imageDesktop} />
            </Slide>
          ))}
        </ReactIdSwiper>
        <StyledContainer>
          <Title>Публикации о нас</Title>
          <PrevButton className='photos__prev-button' onClick={() => swiper.current?.swiper?.slidePrev()} />
          <NextButton className='photos__next-button' onClick={() => swiper.current?.swiper?.slideNext()} />
        </StyledContainer>
      </SliderWrapper>
    </Wrapper>
  )
}
