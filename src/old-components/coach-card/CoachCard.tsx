import { SelectDatetime } from "@/old-components/coach-card/select-date/SelectDatetime"
import { Coach } from "@/lib/api/coach"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import { useMemo, useState } from "react"
import styled, { css } from "styled-components"
import { genCoachSessions } from "@/old-components/coach-card/select-date/select-date.model"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { Icon } from "@/old-components/icon/Icon"
import { useHistory } from "react-router-dom"
import { Button } from "@/old-components/button/normal/Button"
import { getCoachPrices } from "@/old-components/coach-card/get-coach-prices"

const MainInfoContainer = styled.div`
  position: relative;
  display: flex;
  padding: 24px;
  border-radius: 8px;
  background: #fff;
  align-items: flex-start;
  transition: border 300ms;
  padding-bottom: 10px;

  ${MediaRange.lessThan("mobile")`
    padding: 16px;
  `}
`

const Avatar = styled.div<{ image: string | null }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  background-image: url("${props => props.image}");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #fff;
  transition: border 200ms;
  
  @media screen and (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
  ${MediaRange.greaterThan("tablet")`
    width: 60px;
    height: 60px;
  `}
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: 0px;

  ${MediaRange.greaterThan("tablet")`
    margin-left: 16px;
  `}
`

const Name = styled.span`
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  width: 100%;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 20px;
    margin-top: 0;

    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }
  ${MediaRange.greaterThan("tablet")`
    font-size: 20px;
    line-height: 28px;
  `}
`

const Info = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
  flex-wrap: wrap;
`

const AvatarBorder = styled.div<{ isMobile: boolean }>`
  display: ${props => (props.isMobile ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  min-width: 60px;
  position: relative;

  @media screen and (max-width: 600px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    display: ${props => (props.isMobile ? "flex" : "none")};
  }
`

const YellowStar = styled(Icon).attrs({ name: "yellow-star-circle" })`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 1;
`

type BlockTypes = {
  isTopCoach: boolean
}

const ReserveButton = styled(Button)`
  transition: visibility 100ms ease;
  width: 150px;
  visibility: hidden;
  height: 40px;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 10px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const Block = styled.div<BlockTypes>`
  display: inline-table;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  position: relative;
  flex-direction: column;
  border-radius: 8px;
  background: transparent;
  transition: all 200ms ease;
  cursor: pointer;

  ${AvatarBorder} {
    border: 1px solid ${props => (props.isTopCoach ? "#F6C435" : "#fff")};
  }
  ${YellowStar} {
    display: ${props => (props.isTopCoach ? "block" : "none")};
  }
  ${Avatar} {
    ${props =>
    props.isTopCoach
      ? css`
            width: 54px;
            height: 54px;

            @media screen and (max-width: 600px) {
              width: 38px;
              height: 38px;
            }
          `
      : css`
            @media screen and (max-width: 600px) {
              width: 40px;
              height: 40px;
            }
          `}
  }

  ${MainInfoContainer} {
    border: 2px solid #fff;
  }
  
  &:hover {
    ${ReserveButton} {
      visibility: visible;
    }
  }
  
  @media screen and (max-width: 600px) {
    background: #fff;
    height: auto;
    &:active {
      background: #ddd9e3;
    }
  }
  ${MediaRange.greaterThan("mobile")`
    border-radius: 0px;
    height: auto;
  `}
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    justify-content: flex-start;
  }
`

const ReviewsCount = styled.span`
  color: #9aa0a6;
  font-size: 14px;
  line-height: 22px;
`

const Rating = styled.span`
  font-size: 14px;
  line-height: 22px;
  margin-right: 4px;
  color: #424242;

  ${MediaRange.greaterThan("tablet")`
    font-size: 16px;
    line-height: 24px;
  `}
`

const Star = styled(Icon).attrs({ name: "yellow-star" })`
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

type CategoryIconTypes = {
  color: string
}

const CategoriesIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-right: 100px;
  position: relative;
  @media screen and (max-width: 480px) {
    order: 0;
    padding-right: 0;
  }
`

const CategoryBadge = styled.div<CategoryIconTypes>`
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.color};
  position: relative;
  padding: 5px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  white-space: nowrap;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.color};
    opacity: 0.07;
    border-radius: 8px;
  }
`

const PricesContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const Price = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`

const PriceTitle = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #9aa0a6;
`

const PriceCost = styled.div`
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  white-space: nowrap;
`

const Actions = styled.div`
  display: flex;
  width: 100%;
  margin-top: 25px;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 16px;
  }
`

const NameWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    margin-bottom: 19px;
  }
`

type Props = {
  className?: string
  coach: Coach
  freeSessions?: boolean
}

const CoachCardLayout = ({ coach, freeSessions, className }: Props) => {
  const history = useHistory()

  const redirectToCoach = () => {
    freeSessions
      ? history.push(`/search/coach/${coach.id}`, { showFreeSessionsOnly: true })
      : history.push(`/search/coach/${coach.id}`)
  }

  const isThereRating = coach.rating !== null

  const rating = !isThereRating || (coach.rating || 0).toFixed(1).replace(".", ",")

  const prices = getCoachPrices(coach)

  return (
    <Block className={className} isTopCoach={coach.isTopCoach}>
      <MainInfoContainer onClick={redirectToCoach}>
        <AvatarBorder isMobile={false}>
          <YellowStar />
          <Avatar image={coach.avatar} />
        </AvatarBorder>
        <NameContainer>
          <NameWrapper>
            <AvatarBorder isMobile>
              <YellowStar />
              <Avatar image={coach.avatar} />
            </AvatarBorder>
            <Name>
              {`${coach.firstName} ${coach.lastName}`}

              <Meta>
                <Star />
                <Rating>{rating}</Rating>
                <ReviewsCount>{coach.reviewsCount ? `(${coach.reviewsCount})` : "пока нет оценок"}</ReviewsCount>
              </Meta>
            </Name>
          </NameWrapper>

          <Info>
            <CategoriesIcons>
              {coach.categories.map(category => (
                <CategoryBadge key={category.id} color={getCategoryColorById(category.id)}>
                  {category.name}
                </CategoryBadge>
              ))}
            </CategoriesIcons>
          </Info>

          <Actions>
            <PricesContainer>
              {prices.map(price => (
                <Price key={price.title}>
                  <PriceTitle>{price.title}</PriceTitle>
                  <PriceCost>{price.cost} ₽</PriceCost>
                </Price>
              ))}
            </PricesContainer>
            <ReserveButton onClick={redirectToCoach}>{"Забронировать"}</ReserveButton>
          </Actions>
        </NameContainer>
      </MainInfoContainer>
    </Block>
  )
}

export const CoachCard = styled(CoachCardLayout)``
