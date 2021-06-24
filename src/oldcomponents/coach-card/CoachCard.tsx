import { SelectDatetime } from "@/oldcomponents/coach-card/select-date/SelectDatetime"
import { Coach } from "@/lib/api/coach"
import { formatISOStringToLocaleDateString } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { useMemo, useState } from "react"
import * as React from "react"
import styled from "styled-components"
import starIcon from "./images/star.svg"
import arrowIcon from "./images/arrow.svg"
import { genCoachSessions } from "@/oldcomponents/coach-card/select-date/select-date.model"
import { getCategoryColorById } from "@/feature/categories/categories.store"
import { Icon } from "@/oldcomponents/icon/Icon"
import { GrayTooltip } from "@/oldcomponents/gray-tooltip/GrayTooltip"
import { useHistory } from "react-router-dom"
import { parseFloatToString } from "@/lib/formatting/parsenumbers"

const MainInfoContainer = styled.div`
  position: relative;
  display: flex;
  padding: 12px 12px 12px 16px;
  background: #fff;
  align-items: center;
  transition: border 300ms;
`

const Avatar = styled.div<{ image: string | null }>`
  width: 60px;
  height: 60px;
  min-width: 60px;
  background-image: url("${props => props.image}");
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 2px solid #fff;
  transition: border 200ms;
  
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
    margin-top: 10px;
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

  ${MediaRange.lessThan("mobile")`
    order: 2;  
  `}
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
    border: 2px solid ${props => (props.isTopCoach ? "#F6C435" : "#fff")};
  }

  ${MainInfoContainer} {
    border: 2px solid #fff;
  }
  ${PriceContainer} {
    background: ${props => (props.isTopCoach ? "#F6C435" : "#9AA0A6")};
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

const Price = styled.span`
  font-family: Roboto;
  font-size: 8px;
  line-height: 16px;

  ${MediaRange.greaterThan("mobile")`
    font-size: unset;
    line-height: unset;
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
    right: 8px;
    top: 8px;
    height: calc(100% - 8px);
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
  ${MediaRange.lessThan("tablet")`  
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

const Date = styled.span`
  margin-top: auto;
  padding: 25px 0 5px 10px;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  color: #4858cc;

  @media screen and (max-width: 600px) {
    display: none;
  
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

type ArrowType = { reverse?: boolean }

const Arrow = styled.img.attrs<ArrowType>({ src: arrowIcon })`
  margin-left: 6px;
  width: 8px;
  ${({ reverse }: ArrowType) => reverse && "transform: rotate(180deg)"}
`

type Props = {
  className?: string
  coach: Coach
  freeSessions?: boolean
}

const CoachCardLayout = ({ coach, freeSessions, className }: Props) => {
  const [isActive, changeActive] = useState(false)
  const history = useHistory()

  let sessionsListModel: ReturnType<typeof genCoachSessions> | null = null

  if (process.env.BUILD_TARGET === "client") {
    sessionsListModel = useMemo(() => genCoachSessions(coach.id, !!freeSessions), [coach.id])
  }

  const toggleCalendar = (e: React.SyntheticEvent) => {
    changeActive(!isActive)
    e.stopPropagation()
  }

  const redirectToCoach = () => {
    freeSessions ? history.push(`/search/coach/${coach.id}`, {freeSessions: true}) : history.push(`/search/coach/${coach.id}`)
  }

  const minimalTimeWithPrice = Object.entries(coach.prices)
    .sort(([key1], [key2]) => {
      const time1 = parseInt(key1.slice(1), 10)
      const time2 = parseInt(key2.slice(1), 10)
      return time1 - time2
    })
    .filter(([, value]) => value !== null)[0]

  if (!minimalTimeWithPrice) {
    return null
  }

  const minimumPrice = { price: minimalTimeWithPrice[1], text: `${minimalTimeWithPrice[0].slice(1)} мин` }

  const isThereRating = coach.rating !== null

  const rating = !isThereRating || (coach.rating || 0).toFixed(1).replace(".", ",")

  const filledPrices = Object.keys(coach.prices).filter(key => !!coach.prices[key]).length
  const price =
    filledPrices > 1
      ? `от ${parseFloatToString(minimumPrice.price)}₽ за ${minimumPrice.text}`
      : `${minimumPrice.text} / ${parseFloatToString(minimumPrice.price)}₽`

  return (
    <Block className={className} isActive={isActive} isTopCoach={coach.isTopCoach}>
      <MainInfoContainer onClick={redirectToCoach}>
        <Avatar image={coach.avatar} />
        <NameContainer>
          <Name>{`${coach.firstName} ${coach.lastName}`}</Name>
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
            <ReviewsCount>{coach.reviewsCount || "Пока нет оценок"}</ReviewsCount>
            <Star />
            <Rating>{rating}</Rating>
          </Meta>
          <Date onClick={toggleCalendar}>
            {formatISOStringToLocaleDateString(coach.nearestSessionDatetime, "DD MMMM HH:mm")}
            <Arrow reverse={isActive} />
          </Date>
        </RatingContainer>
      </MainInfoContainer>
      {isActive && <SelectDatetime coach={coach} sessionsData={sessionsListModel!} />}
    </Block>
  )
}

export const CoachCard = styled(CoachCardLayout)``
