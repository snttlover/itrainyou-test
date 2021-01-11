import React from "react"
import styled from "styled-components"
import { GrayTooltip } from "@/components/gray-tooltip/GrayTooltip"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { MediaRange } from "@/lib/responsive/media"
import starIcon from "@/components/coach-card/images/star.svg"
import { Icon } from "@/components/icon/Icon"
import { Coach } from "@/lib/api/coach"

type RescheduleSessionCoach = {
  coach: Coach
}

export const RescheduleSessionCoach = (props: RescheduleSessionCoach) => {

  const coach = props.coach

  const rating = (coach.rating || 0).toFixed(1).replace(".", ",")

  const minimumPrice = Object.entries(coach.prices).reduce(
    (acc, [key, price]) => {
      if (price !== null && price < acc.price) {
        return {
          price: Math.ceil(price),
          text: `${key.slice(1, key.length)} мин`,
        }
      } else {
        return acc
      }
    },
    { price: Infinity, text: "0 минут" }
  )

  // @ts-ignore
  const filledPrices = Object.keys(coach.prices).filter(key => !!coach.prices[key]).length
  const price =
    filledPrices > 1
      ? `от ${minimumPrice.price}₽ за ${minimumPrice.text}`
      : `${minimumPrice.text} / ${minimumPrice.price}₽`

  return (
    <MainInfoContainer isTopCoach={coach.isTopCoach}>
      <Avatar image={coach.avatar} />
      <NameContainer>
        <Name>{`${coach.firstName} ${coach.lastName}`}</Name>

        <MobileRatingColumn>
          <MobileRangeIcon />
          <MobileRangeText>{rating}</MobileRangeText>
        </MobileRatingColumn>

        <Info>
          {coach.isTopCoach && (
            <GrayTooltip text='Топ-коуч'>
              <TopCoachIcon />
            </GrayTooltip>
          )}
          <CategoriesIcons>
            {coach.categories.map(category => (
              <GrayTooltip key={category.id} text={category.name}>
                <CategoryIcon color={getCategoryColorById(category.id)} />
              </GrayTooltip>
            ))}
          </CategoriesIcons>

          <PriceContainer>
            <Price>{price}</Price>
          </PriceContainer>
        </Info>
      </NameContainer>
      <RatingContainer>
        <Meta>
          <ReviewsCount>{coach.reviewsCount}</ReviewsCount>
          <Star />
          <Rating>{rating}</Rating>
        </Meta>
      </RatingContainer>
    </MainInfoContainer>
  )
}

const Avatar = styled.div<{ image: string | null }>`
  width: 60px;
  height: 60px;
  background-image: url("${props => props.image}");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #fff;
  transition: border 200ms;

  ${MediaRange.lessThan("mobile")`
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
  font-size: 20px;
  line-height: 26px;
  margin-top: 10px;
  color: #424242;

  ${MediaRange.lessThan("mobile")`
    font-family: Roboto Slab;
    font-size: 16px;
    line-height: 26px;
  `}
`

const Info = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
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
  margin-top: -4px;

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

const Price = styled.span`
  ${MediaRange.lessThan("mobile")`
    font-size: 8px;
    line-height: 16px;
  `}
`

const RatingContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;

  position: absolute;
  right: 12px;
  top: 12px;
  height: calc(100% - 24px);
  ${MediaRange.lessThan("mobile")`
    display: none;
  `}
`

const Meta = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const ReviewsCount = styled.span`
  font-size: 12px;
  color: #5b6670;
`

const Rating = styled.span`
  font-size: 12px;
  color: #5b6670;

  @media screen and (max-width: 600px) {
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

const CategoriesIcons = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    order: 0;
  }
`

const TopCoachIcon = styled(Icon).attrs({ name: "top-coach" })`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  @media screen and (max-width: 480px) {
    order: 1;
    width: 16px;
    height: 16px;
  }
`

type CategoryIconTypes = {
  color: string
}

const CategoryIcon = styled(Icon).attrs({ name: "tabletka" })<CategoryIconTypes>`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: ${props => props.color};

  @media screen and (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`

const MobileRatingColumn = styled.div`
  display: none;
  ${MediaRange.lessThan("mobile")`
    display: flex;
    align-items: center;
    margin-top: 7px;
  `}
`

const MobileRangeIcon = styled(Icon).attrs({ name: "star" })`
  fill: ${props => props.theme.colors.primary};
  margin-right: 6px;
  width: 15px;
`

const MobileRangeText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.primary};
`

type MainInfoContainerTypes = {
  isTopCoach: boolean
}

const MainInfoContainer = styled.div<MainInfoContainerTypes>`
  position: relative;
  display: flex;
  padding: 12px 12px 12px 16px;
  background: #fff;
  align-items: center;
  transition: border 300ms;

  ${Avatar} {
    border: 2px solid ${props => (props.isTopCoach ? "#F6C435" : "#fff")};
  }

  ${PriceContainer} {
    background: ${props => (props.isTopCoach ? "#F6C435" : "#9AA0A6")};
  }

  &:hover {
    border: 2px solid #dbdee0;
  }

  ${MediaRange.greaterThan("tablet")`
    padding: 8px 12px 12px;
  `}
  ${MediaRange.lessThan("mobile")`
    align-items: center;
    display: flex;
  `}
`
