import { Avatar } from "@/components/avatar/Avatar"
import { Rating } from "@/components/rating/Rating"
import { Loader } from "@/components/spinner/Spinner"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { $profileData, $reviews, loadReviewsFx } from "../profile.model"
import { Block } from "@/pages/search/coach-by-id/components/common/Block"
import { useStore } from "effector-react"
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
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;

  margin-left: 8px;
  ${MediaRange.greaterThan("mobile")`
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    
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

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`

type ReviewProps = {
  name: string
  rating: number
  avatar: string | null
  text: string
  date: string
}

const Review = styled(({ name, rating, avatar, text, date: reviewDate, ...props }: ReviewProps) => {
  const [isOpen, setOpen] = useState(false)
  const isTextOverflow = text.length >= 229
  const fixedText = !isOpen && isTextOverflow ? text.slice(0, 229) + "…" : text
  return (
    <StyledBlock {...props}>
      <UserInfoContainer>
        <StyledAvatar src={avatar} />
        <UserName>{name}</UserName>
        <StyledRating value={rating} />
      </UserInfoContainer>
      <Text>{fixedText}</Text>
      <BottomLine>
        {isTextOverflow && (
          <OpenFullReview onClick={() => setOpen(!isOpen)}>{isOpen ? "Скрыть отзыв" : "Весь отзыв"}</OpenFullReview>
        )}
        <Date>{date(reviewDate).format("DD MMM YYYY")}</Date>
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

const EmptyPlaceholder = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;

  color: #9aa0a6;
  margin: 20px auto;
  width: 240px;

  ${MediaRange.greaterThan("mobile")`    
    font-size: 16px;
    line-height: 22px;
    width: auto;
  `}
`

export const Reviews = styled(props => {
  const reviews = useStore($reviews)
    .filter(review => review.reviewerClient)
    .map(review => (
      <Review
        key={review.id}
        name={`${review.reviewerClient?.firstName} ${review.reviewerClient?.lastName}`}
        rating={review.grade}
        avatar={review.reviewerClient?.avatar || null}
        text={review.text}
        date={review.creationDatetime}
      />
    ))

  const isLoading = useStore(loadReviewsFx.pending)

  return (
    <Container {...props}>
      <Title>Отзывы</Title>
      <ReviewsList>
        {isLoading && <Loader />}
        {!isLoading &&
          (reviews.length > 0 ? (
            reviews
          ) : (
            <EmptyPlaceholder key='preview'>У коуча нет отзывов. Вы можете стать первым!</EmptyPlaceholder>
          ))}
      </ReviewsList>
    </Container>
  )
})``
