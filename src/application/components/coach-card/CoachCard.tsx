import { SelectDatetime } from "@/application/components/coach-card/SelectDatetime"
import { Coach } from "@/application/lib/api/coach"
import { formatISOStringToLocaleDateString } from "@/application/lib/formatting/date"
import { MediaRange } from "@/application/lib/media/media"
import { useState } from "react"
import * as React from "react"
import styled from "styled-components"
import starIcon from "./star.svg"
import arrowIcon from "./arrow.svg"

const Block = styled.div<{ isActive: boolean }>`
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background: ${({ isActive }) => (isActive ? "#DDD9E3" : "#FFFFFF")};
  transition: border 200ms ease;
  height: 104px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 480px) {
    background: #fff;
    height: auto;
    &:active {
      background: #ddd9e3;
    }
  }
  ${MediaRange.greaterThan("tablet")`
    height: auto;
    padding: 4px;    
  `}
`

const MainInfoContainer = styled.div`
  display: flex;
  padding: 12px 12px 12px 16px;
  ${MediaRange.greaterThan("tablet")`
    padding: 8px 12px 12px;
  `}
`

const Avatar = styled.div<{ image: string }>`
  width: 60px;
  height: 60px;
  background-image: url("${props => props.image}");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  
  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
  ${MediaRange.greaterThan("tablet")`
    width: 80px;
    height: 80px;
  `}
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 12px;

  ${MediaRange.greaterThan("tablet")`
    margin-left: 16px;
  `}
`

const Name = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #424242;

  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 20px;
    margin-top: 30px;
  }
  ${MediaRange.greaterThan("tablet")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const Info = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  ${MediaRange.greaterThan("tablet")`
    margin-left: 16px;
  `}
`

const Category = styled.img`
  height: 16px;
  width: 16px;
  ${MediaRange.greaterThan("tablet")`
    height: 24px;
    width: 24px;
  `}
`

const PriceContainer = styled.div`
  border: 1px solid #b3b3b3;
  height: 20px;
  border-radius: 12px;
  padding: 4px 8px;
  margin-left: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  color: #424242;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  ${MediaRange.greaterThan("tablet")`
    height: 24px;
    font-size: 12px;
    line-height: 16px;
  `}
`

const Duration = styled.span`
  position: relative;
  &:after {
    content: "";
    height: calc(100% + 20px);
    width: 1px;
    position: absolute;
    top: -10px;
    right: -8px;
    background-color: #b3b3b3;
    transform: rotate(25deg);
  }
`

const Price = styled.span`
  margin-left: 16px;
`

const RatingContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
`

const Meta = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const ReviewsCount = styled.span`
  font-size: 12px;
  color: #424242;
`

const Rating = styled.span`
  font-size: 12px;
  color: #424242;

  @media screen and (max-width: 480px) {
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
  }
  ${MediaRange.greaterThan("tablet")`  
    font-size: 20px;
  `}
`

const Star = styled.img.attrs({ src: starIcon })`
  width: 10px;
  height: 10px;
  margin: 0 3px;

  @media screen and (max-width: 480px) {
    width: 13px;
    height: 13px;
  }

  ${MediaRange.greaterThan("tablet")`  
    width: 14px;
    height: 14px;
    margin: 0 5px;
  `}
`

const Date = styled.span`
  margin-top: auto;
  font-size: 10px;
  line-height: 12px;
  color: #424242;
  display: flex;

  @media screen and (max-width: 480px) {
    display: none;
  }
  ${MediaRange.greaterThan("tablet")`  
    font-size: 12px;
    line-height: 16px;
  `}
`
type ArrowType = { reverse?: boolean }

const Arrow = styled.img.attrs<ArrowType>({ src: arrowIcon })`
  margin-left: 6px;
  width: 8px;
  ${({ reverse }: ArrowType) => reverse && "transform: rotate(180deg)"}
`

type Props = {
  className?: string
  coach: Coach
}

const CoachCardLayout = ({ coach, className }: Props) => {
  const [isActive, changeActive] = useState(false)

  const rating = (coach.rating || 0).toFixed(1).replace(".", ",")

  return (
    <Block className={className} isActive={isActive}>
      <MainInfoContainer onClick={() => changeActive(!isActive)}>
        <Avatar image={coach.avatar} />
        <NameContainer>
          <Name>{`${coach.firstName} ${coach.lastName}`}</Name>
          <Info>
            {coach.categories.map(category => (
              <Category key={category.id} src={category.icon} />
            ))}
            <PriceContainer>
              <Duration>65 мин</Duration>
              <Price>1200 ₽</Price>
            </PriceContainer>
          </Info>
        </NameContainer>
        <RatingContainer>
          <Meta>
            <ReviewsCount>{coach.reviewsCount}</ReviewsCount>
            <Star />
            <Rating>{rating}</Rating>
          </Meta>
          <Date>
            {formatISOStringToLocaleDateString(coach.creationDatetime, "DD MMMM HH:mm")}
            <Arrow reverse={isActive} />
          </Date>
        </RatingContainer>
      </MainInfoContainer>
      {isActive && <SelectDatetime />}
    </Block>
  )
}

export const CoachCard = styled(CoachCardLayout)``
