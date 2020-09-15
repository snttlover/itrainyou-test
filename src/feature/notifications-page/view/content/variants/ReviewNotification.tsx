import React from "react"
import { ReviewNotificationType } from "@/lib/api/client/get-notifications"
import { RatingPicker } from "@/components/rating/RatingPicker"

import { Card, NotificationAvatar, Title, Bold, Time, Row } from "../common/NotificationsCommon"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"

export type ReviewNotificationProps = {
  notification: ReviewNotificationType
  time: string
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

export const ReviewNotification = (props: ReviewNotificationProps) => {
  const { review } = props.notification
  return (
    <Card>
      <Row>
        <StyledLink to={routeNames.coachClientProfile(review.reviewerClient.id.toString())}>
          <NotificationAvatar src={review.reviewerClient.avatar} />
        </StyledLink>
        <Title>
          <StyledLink to={routeNames.coachClientProfile(review.reviewerClient.id.toString())}>
            <Bold>
              {review.reviewerClient.firstName} {review.reviewerClient.lastName}
            </Bold>
          </StyledLink>{" "}
          оставила о вас отзыв
          {review.text && <Review>{review.text}</Review>}
        </Title>
        <Time>{props.time}</Time>
      </Row>
      <GradeWrapper>
        <RatingPicker value={review.grade} />
      </GradeWrapper>
    </Card>
  )
}

// ToDO: костыль от менеджера (pointer-events: none;) для карточки https://app.clickup.com/t/86pu9t
// пофиксить в будущем
const GradeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
  pointer-events: none;
`

const Review = styled(Title)`
  margin-top: 12px !important;
  margin-left: 0 !important;
`
