import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { $coach } from "@/pages/search/coach-by-id/coach-by-id.model"
import { Block } from "@/pages/search/coach-by-id/components/common/Block"
import { ImagesViewModal } from "@/pages/search/coach-by-id/ImagesViewModal"
import { useStore } from "effector-react/ssr"
import React, { useRef, useState } from "react"
import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import styled from "styled-components"
import { SwiperOptions } from "swiper"

const StyledBlock = styled(Block)`
  ${MediaRange.between("mobile", "laptop")`
    padding: 20px 16px;
  `}
`

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

  &:not(:first-child) {
    margin-top: 12px;
  }

  ${MediaRange.greaterThan("mobile")`
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
  `}
`

const Description = styled.h3`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  word-break: break-word;
  word-wrap: break-word;

  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
  `}
`

const Photos = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${MediaRange.greaterThan("mobile")`
    margin-top: 16px;
  `}

  & > .swiper__container {
    width: 100%;
    height: 100px;
    overflow: hidden;
  }
`

const Photo = styled.div<{ src: string }>`
  width: 100px;
  max-width: 100px;
  height: 100px;
  max-height: 100px;
  background: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`

const ArrowButton = styled(Icon).attrs({ name: "arrow" })`
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
  display: none;
  fill: #4858cc;
  cursor: pointer;
  user-select: none;

  &.photos__prev-button {
    transform: rotate(90deg);
    margin-right: 10px;
  }

  &.photos__next-button {
    transform: rotate(-90deg);
    margin-left: 10px;
  }

  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

const swiperOptions: SwiperOptions = {
  freeMode: true,
  navigation: {
    prevEl: "#photos__prev-button",
    nextEl: "#photos__next-button",
  },
  slidesPerView: "auto",
  a11y: false,
  watchOverflow: true,
}

export const AboutCoach = styled(props => {
  const [imageViewIndex, setImageViewIndex] = useState<number | null>(null)
  const swiper = useRef<SwiperRefNode>(null)

  const coach = useStore($coach)
  const photos = coach?.photos.map((src, i) => <Photo src={src} key={i} onClick={() => setImageViewIndex(i)} />) || []

  return (
    <StyledBlock {...props}>
      {coach?.description && (
        <>
          <Title>О себе</Title>
          <Description>{coach.description}</Description>
        </>
      )}
      {coach?.workExperience && (
        <>
          <Title>Опыт работы</Title>
          <Description>{coach.workExperience}</Description>
        </>
      )}
      {coach?.education && (
        <>
          <Title>Образование</Title>
          <Description>{coach.education}</Description>
        </>
      )}
      {photos.length > 0 && (
        <>
          <Title>Фотографии</Title>
          <Photos>
            <ArrowButton
              className='photos__prev-button'
              id='photos__prev-button'
              onClick={() => swiper.current?.swiper?.slidePrev()}
            />
            <ReactIdSwiper {...swiperOptions} containerClass='swiper__container' ref={swiper}>
              {photos}
            </ReactIdSwiper>
            <ArrowButton
              className='photos__next-button'
              id='photos__next-button'
              onClick={() => swiper.current?.swiper?.slideNext()}
            />
          </Photos>
        </>
      )}
      {typeof imageViewIndex === "number" && coach?.photos && (
        <ImagesViewModal photos={coach.photos} close={() => setImageViewIndex(null)} initialSlide={imageViewIndex} />
      )}
    </StyledBlock>
  )
})``
