import styled, { css } from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import React from "react"
import { Step4Client } from "@/pages/auth/pages/signup/content/step-4/Step4Client"
import { Step4Coach } from "@/pages/auth/pages/signup/content/step-4/Step4Coach"

const Price = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 21px;
  white-space: nowrap;

  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
  `}
`

const Date = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  margin-left: 8px;
  ${MediaRange.lessThan("mobile")`
    margin-top: 8px;
    font-size: 12px;
    line-height: 16px;
  `}
`

const Time = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #9aa0a6;
  margin-left: 39px;
  ${MediaRange.lessThan("mobile")`
    display: none;
  `}
`

const canceledStyles = css`
  ${Date} {
    color: #9aa0a6;
  }
  ${Time} {
    color: #dbdee0;
  }
`

const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  padding: 12px 0;
  padding-right: 16px;
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  min-width: 40px;
  margin-left: 16px;

  ${MediaRange.lessThan("mobile")`
    width: 24px;
    min-width: 24px;
    height: 24px;
  `}
`

const Name = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  margin-left: 8px;
  width: 40%;
  flex: 1;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
    margin-left: 4px;
  `}
`

const Cancel = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #9aa0a6;
  white-space: pre-wrap;
  margin-left: 15px;
  ${MediaRange.lessThan("mobile")`
    align-self: flex-end;
    font-size: 12px;
    line-height: 16px;
  `}
`

const Ruble = styled(Icon).attrs({ name: "ruble" })`
  margin-left: 4px;
  width: 15px;
  height: 15px;
  margin-bottom: -2px;
`

const RightMobileGroup = styled.div<{ canceled: boolean }>`
  display: flex;
  align-items: center;
  ${({ canceled }) => canceled && canceledStyles}
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    align-items: flex-end;  
  `}
`

type IndividualSessionItemType = {
  data: {
    avatar: string
    name: string
    price: string
    time: string
    date: string // iso
    status: string
  }
}

export const IndividualSessionItem = (props: IndividualSessionItemType) => {
  const Status = () => {
    switch (props.data.status) {
    case "WAITING_FOR_HOLD":
      return <Cancel>ожидание заморозки</Cancel>
    case "IS_HELD":
      return <Cancel>сессия проводится</Cancel>
    case "SESSION_CANCELLED":
      return <Cancel>сессия отменена</Cancel>
    case "SUCCEEDED":
      return <Cancel>средства списаны</Cancel>
    case "REFUNDED":
      return <Cancel>средства возвращены</Cancel>
    default:
      return null
    }
  }
  return (
    <Item>
      <StyledAvatar src={props.data.avatar} />
      <Name>{props.data.name}</Name>
      <Status />
      <RightMobileGroup canceled={props.data.status === "IS_HELD"}>
        <Price>
          {props.data.price}
          <Ruble />
        </Price>
        <Time>{props.data.time}</Time>
        <Date>{props.data.date}</Date>
      </RightMobileGroup>
    </Item>
  )
}
