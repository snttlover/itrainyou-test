import { Avatar } from "@/application/components/avatar/Avatar"
import { Rating } from "@/application/components/rating/Rating"
import { MediaRange } from "@/application/lib/responsive/media"
import { Block } from "@/application/pages/couch/pages/by-id/components/common/Block"
import dayjs from "dayjs"
import React, { useState } from "react"
import styled from "styled-components"

const StyledBlock = styled(Block)`
  position: relative;
  padding-bottom: 30px;

  ${MediaRange.greaterThan("mobile")`
    padding: 16px 12px 30px 16px;
  `}
`

const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledRating = styled(Rating)`
  position: absolute;
  right: 0;
  top: 0;
  ${MediaRange.greaterThan("mobile")`
    top: 50%;
    transform: translate(0, -50%);
  `}
`

const UserName = styled.div`
  margin-left: 8px;
  ${MediaRange.greaterThan("mobile")`
    margin-left: 12px;
  `}
`
const Text = styled.p`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
`

const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  padding: 0 8px;
  ${MediaRange.greaterThan("mobile")`
    padding: 0 16px;
  `}
`

const OpenFullReview = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #4858cc;
  cursor: pointer;
`

const Date = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
  margin-left: auto;
`

type ReviewProps = {
  name: string
  rating: number
  avatar: string | null
  text: string
  date: string
}

const Review = styled(({ name, rating, avatar, text, date, ...props }: ReviewProps) => {
  const [isOpen, setOpen] = useState(false)
  const isTextOverflow = text.length >= 229
  const fixedText = !isOpen && isTextOverflow ? text.slice(0, 229) + "…" : text
  return (
    <StyledBlock {...props}>
      <UserInfoContainer>
        <Avatar src={avatar} size={40} />
        <UserName>{name}</UserName>
        <StyledRating value={rating} />
      </UserInfoContainer>
      <Text>{fixedText}</Text>
      <BottomLine>
        {isTextOverflow && (
          <OpenFullReview onClick={() => setOpen(!isOpen)}>{isOpen ? "Скрыть отзыв" : "Весь отзыв"}</OpenFullReview>
        )}
        <Date>{dayjs(date).format("DD MMM YYYY")}</Date>
      </BottomLine>
    </StyledBlock>
  )
})``

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  min-width: 304px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  ${MediaRange.greaterThan("laptop")`    
    margin: 0;
  `}
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
  `}
`

const ReviewsList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 16px;
  `}

  ${Review} {
    &:not(:first-child) {
      margin-top: 8px;
      ${MediaRange.greaterThan("mobile")`
        margin-top: 12px;
      `}
    }
  }
`

export const Reviews = styled(props => {
  return (
    <Container {...props}>
      <Title>Отзывы</Title>
      <ReviewsList>
        <Review
          name='Bernard Fox'
          rating={4.5}
          avatar={null}
          text={
            "Самые позитивные впечатления о тренинге. Много нового, большой объем новых инструментов для работы, которые были даны в очень удобной для меня форме. Вне сомнений профессионал. Михаил, спасибо! Обязательно посещу еще какой-нибудь тренинг у Вас. Все достойно."
          }
          date={dayjs().toISOString()}
        />
        <Review
          name='Bernard Fox'
          rating={4.5}
          avatar={null}
          text={
            "Самые позитивные впечатления о тренинге. Много нового, большой объем новых инструментов для работы, которые были даны в очень удобной для меня форме. Вне сомнений профессионал. Михаил, спасибо! Обязательно посещу еще какой-нибудь тренинг у Вас. Все достойно."
          }
          date={dayjs().toISOString()}
        />
        <Review
          name='Bernard Fox'
          rating={4.5}
          avatar={null}
          text={
            "Самые позитивные впечатления о тренинге. Много нового, большой объем новых инструментов для работы, которые были даны в очень удобной для меня форме. Вне сомнений профессионал. Михаил, спасибо! Обязательно посещу еще какой-нибудь тренинг у Вас. Все достойно."
          }
          date={dayjs().toISOString()}
        />
      </ReviewsList>
    </Container>
  )
})``
