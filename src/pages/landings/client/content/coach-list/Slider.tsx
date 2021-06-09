import React, { useRef } from "react"
import styled from "styled-components"

import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import { SwiperOptions } from "swiper"

import { getCategoryColorById } from "@/feature/categories/categories.store"

const swiperOptions: SwiperOptions = {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 20,
}

const Wrapper = styled.section`
  height: 420px;
`

const SliderWrapper = styled.div`
  height: 420px;
  width: 100%;
  background: white;
  position: relative;

  .swiper-wrapper {
    width: 264px;
    height: 420px;

    @media (min-width: 768px) {
      width: 441px;
    }
  }
`

const Slide = styled.div`
  background: white;

  width: 264px;
  height: 420px;
  padding: 44px 5px 5px 5px;

  display: flex;
  flex-direction: column;
  align-items: center;

  &:first-child {
    margin-left: 20px;
  }

  &:last-child {
    margin-right: 20px;
  }

  @media (min-width: 768px) {
    width: 441px;
  }

  position: relative;

  &::before {
    position: absolute;
    content: "";
    top: 10px;
    bottom: 10px;
    left: 0;
    right: 0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14);
    border-radius: 8px;
  }
`

const CoachAvatar = styled.div<{ avatar: string }>`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background: ${props => props.avatar};
  margin-bottom: 24px;
`

const CoachName = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: #444444;
  margin-bottom: 16px;
`

const CoachRating = styled.p``

const CoachCategories = styled.ul``

const Category = styled.li<{ catColor: string }>`
  padding: 5px 8px;
  color: ${props => props.catColor};
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
          {coaches.map((coach, index) => (
            <Slide key={index}>
              <CoachAvatar avatar={coach.avatar} />
              <CoachName>
                {coach.first_name} {coach.last_name}
              </CoachName>
              <CoachRating>
                {coach.rating} <span>{coach.reviews_count}</span>
              </CoachRating>
              <CoachCategories>
                {coach.categories.map((cat: { id: number; name: string }) => (
                  <Category catColor={getCategoryColorById(cat.id)}>{cat.name}</Category>
                ))}
              </CoachCategories>
            </Slide>
          ))}
        </ReactIdSwiper>
      </SliderWrapper>
    </Wrapper>
  )
}
