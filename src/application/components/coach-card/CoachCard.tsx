import { SelectDatetime } from "@/application/components/coach-card/select-date/SelectDatetime"
import { Coach } from "@/application/lib/api/coach"
import { formatISOStringToLocaleDateString } from "@/application/lib/formatting/date"
import { MediaRange } from "@/application/lib/responsive/media"
import { useMemo, useState } from "react"
import * as React from "react"
import styled from "styled-components"
import starIcon from "./images/star.svg"
import arrowIcon from "./images/arrow.svg"
import { genCoachSessions } from "@/application/components/coach-card/select-date/select-date.model"
import { getCategoryColorById } from "@/application/feature/categories/categories.store"
import { Icon } from "@/application/components/icon/Icon"

const MainInfoContainer = styled.div`
  display: flex;
  padding: 12px 12px 12px 16px;
  background: #fff;
  align-items: center;

  &:hover {
    border: 2px solid #DBDEE0;
  }
  
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
  
  @media screen and (max-width: 600px) {
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
  justify-content: center;
  margin-left: 12px;

  ${MediaRange.greaterThan("tablet")`
    margin-left: 16px;
  `}
`

const Name = styled.span`
  font-style: normal;
  font-size: 16px;
  line-height: 20px;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 20px;
    margin-top: 30px;
  }
  ${MediaRange.greaterThan("tablet")`
    font-size: 20px;
    line-height: 26px;
    margin-top: 24px;
  `}
`

const Info = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
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
  white-space: nowrap;
  height: 20px;
  border-radius: 12px;
  padding: 4px 8px;
  margin-left: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: #fff;

  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${MediaRange.greaterThan("tablet")`
    height: 24px;
    font-size: 12px;
    line-height: 16px;
  `}
  
  @media screen and (max-width: 480px) {
    order: 2;
  }
`


type BlockTypes = {
  isTopCoach: boolean
  isActive: boolean
}

const Block = styled.div<BlockTypes>`
  display: inline-table;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  position: relative;
  flex-direction: column;
  border-radius: 2px;
  background: transparent;
  transition: border 200ms ease;
  cursor: pointer;
  
  ${Avatar} {
    border: 2px solid ${props => props.isTopCoach ? `#F6C435` : `#fff`};
  }
  
  ${MainInfoContainer} {
    border: 2px solid ${({isTopCoach}) => isTopCoach ? `#DBDEE0` : `#fff`};
  }
  ${PriceContainer} {
    background: ${props => props.isTopCoach ? `#F6C435` : `#9AA0A6`};
  }

  @media screen and (max-width: 600px) {
    background: #fff;
    height: auto;
    &:active {
      background: #ddd9e3;
    }
  }
  ${MediaRange.greaterThan("tablet")`
    height: auto;
  `}
`


const Duration = styled.span`
  position: relative;
`

const Price = styled.span``

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
`

const Rating = styled.span`
  font-size: 12px;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
  }
  ${MediaRange.greaterThan("tablet")`  
    font-size: 20px;
  `}
`

const PriceContainerDelemiter = styled.div`
  margin-right: 5px;
  margin-left: 5px;
`

const Star = styled.img.attrs({ src: starIcon })`
  width: 10px;
  height: 10px;
  margin: 0 3px;

  @media screen and (max-width: 600px) {
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
  display: flex;
  color: #4858CC;

  @media screen and (max-width: 600px) {
    display: none;
  }
  ${MediaRange.greaterThan("tablet")`  
    font-size: 12px;
    line-height: 16px;
  `}
`

type CategoryIconTypes = {
  color: string
}

const CategoriesIcons = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    order: 0;
  }
`

const TopCoachIcon = styled(Icon).attrs({ name: `top-coach` })`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  @media screen and (max-width: 480px) {
    order: 1;
    width: 16px;
    height: 16px;
  }
`

const CategoryIcon = styled(Icon).attrs({ name: `tabletka` })<CategoryIconTypes>`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: ${(props) => props.color};
  
  @media screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
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

  const sessionsListModel = useMemo(() => genCoachSessions(coach.id), [coach.id])

  if (isActive) {
    sessionsListModel.loadData({
      params: {}
    })
  }

  const minimumPrice = Object.entries(coach.prices).reduce((acc, [key, price]) => {
    if (price !== null && price < acc.price) {
      return {
        price: Math.ceil(price),
        text: ` за ${key.slice(1, key.length)} мин`
      }
    } else {
      return acc
    }
  }, { price: Infinity, text: `0 минут` })

  const rating = (coach.rating || 0).toFixed(1).replace(".", ",")

  return (
    <Block className={className} isActive={isActive} isTopCoach={coach.isTopCoach}>
      <MainInfoContainer onClick={() => changeActive(!isActive)} >
        <Avatar image={coach.avatar} />
        <NameContainer>
          <Name>
            {`${coach.firstName} ${coach.lastName}`}
          </Name>
          <Info>
            { coach.isTopCoach && <TopCoachIcon /> }
            <CategoriesIcons>
              {coach.categories.map(category => (
                <CategoryIcon color={getCategoryColorById(category.id)} />
              ))}
            </CategoriesIcons>

            <PriceContainer>
              <Price>{minimumPrice.price}₽ {minimumPrice.text}</Price>
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
            {formatISOStringToLocaleDateString(coach.nearestSessionDatetime, "DD MMMM HH:mm")}
            <Arrow reverse={isActive} />
          </Date>
        </RatingContainer>
      </MainInfoContainer>
      {isActive && (
        <SelectDatetime
          coach={coach}
          sessionsData={sessionsListModel}
        />
      )}
    </Block>
  )
}

export const CoachCard = styled(CoachCardLayout)``
