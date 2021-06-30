import React, { useRef } from "react"
import styled from "styled-components"

import ReactIdSwiper, { SwiperRefNode } from "react-id-swiper"
import { SwiperOptions } from "swiper"

import { Link, useHistory } from "react-router-dom"
import { routeNames } from "@/pages/route-names"

import { Category } from "./Category"

import starIcon from "../../assets/coach-list/star.svg"
import { useStore } from "effector-react"
import { $isLoggedIn } from "@/feature/user/user.model"

const swiperOptions: SwiperOptions = {
  observer: true,
  observeParents: true,
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

const Slide = styled(Link)`
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
    pointer-events: none;
  }
`

const CoachAvatar = styled.div<{ avatar: string }>`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  background-color: #e4e3e3;
  background-image: url('${props => props.avatar}');
  background-size: cover;
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

const CoachRating = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #444444;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding-left: 20px;

  span {
    display: inline-block;
    margin-left: 4px;
    font-size: 14px;
    line-height: 24px;
    color: #9399ab;
  }

  position: relative;

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 16px;
    height: 16px;
    background-image: url('${starIcon}');
    background-size: 16px 16px;
  }
`

const CoachCategories = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 350px;
  }
`

type Props = {
  coaches: any[]
}

export const Slider = ({ coaches }: Props) => {
  const isLoggedIn = useStore($isLoggedIn)

  const redirectToCoach = (coachId: number) => {
    if (!isLoggedIn) return {
      pathname: `/search/coach/${coachId}`,
      state: { showFreeSessionsOnly: true }
    }

    return {
      pathname: `/search/coach/${coachId}`
    }
  }

  const swiper = useRef<SwiperRefNode>(null)

  return (
    <Wrapper>
      <SliderWrapper>
        <ReactIdSwiper {...swiperOptions} ref={swiper}>
          {coaches.map((coach, index) => (
            <Slide key={index} to={() => redirectToCoach(coach.id)}>
              <CoachAvatar avatar={coach.avatar} />
              <CoachName>
                {coach.firstName} {coach.lastName}
              </CoachName>
              <CoachRating>
                {coach.rating} <span>({coach.reviewsCount})</span>
              </CoachRating>
              <CoachCategories>
                {coach.categories.map((cat: { id: number; name: string }) => (
                  <Category key={cat.id} id={cat.id} name={cat.name} />
                ))}
              </CoachCategories>
            </Slide>
          ))}
        </ReactIdSwiper>
      </SliderWrapper>
    </Wrapper>
  )
}
