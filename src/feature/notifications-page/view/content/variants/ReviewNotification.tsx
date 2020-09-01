import React from "react"
import { ReviewNotificationType } from "@/lib/api/client/get-notifications"
import {RatingPicker} from "@/components/rating/RatingPicker"

import { Card, NotificationAvatar, Title, Bold, Time, Row } from "../common/NotificationsCommon"
import styled from "styled-components"

export type ReviewNotificationProps = {
  notification: ReviewNotificationType
  time: string
}

export const ReviewNotification = (props: ReviewNotificationProps) => {
  const { review } = props.notification
  return (
    <Card>
      <Row>
        <NotificationAvatar src={review.reviewerClient.avatar} />
        <Title>
          <Bold>
            {review.reviewerClient.firstName} {review.reviewerClient.lastName}
          </Bold>{" "}
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

const GradeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
`

const Review = styled(Title)`
  margin-top: 12px;
`
