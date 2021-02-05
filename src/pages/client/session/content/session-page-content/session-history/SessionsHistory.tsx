import React from "react"
import styled from "styled-components"
import { ISODate } from "@/lib/api/interfaces/utils.interface"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { createInfinityScroll } from "@/feature/pagination"
import { SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { CreatePaginationType } from "@/feature/pagination/modules/pagination"

type SessionsHistoryProps = {
  pagination: CreatePaginationType<SessionRequest>
  list: {
    id: number
    text: string
    date: string
  }[]
}

export const SessionsHistory = (props: SessionsHistoryProps) => {
  const InfiniteScroll = createInfinityScroll(props.pagination)
  console.log(props)
  return (
    <Container>
      <Header>История сессии</Header>
      <Items>
        <InfiniteScroll>
          {props.list.map(session => (
            <SessionItem key={session.id} date={session.date}>
              {session.text}
            </SessionItem>
          ))}
        </InfiniteScroll>
      </Items>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-top: 24px;
  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 26px;
    margin-top: 12px;
  `}
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  background: #ffffff;
  border-radius: 2px;
  margin-top: 16px;
  ${MediaRange.lessThan("mobile")`
    margin-top: 8px;
    padding: 10px;
  `}
`

type SessionItemTypes = {
  children: React.ReactChild
  date: ISODate
}

const SessionItem = (props: SessionItemTypes) => {
  return (
    <StyledSessionItem>
      <Text>{props.children}</Text>
      <Date>{props.date}</Date>
    </StyledSessionItem>
  )
}

const StyledSessionItem = styled.div`
  display: flex;
  position: relative;

  &:not(:last-child) {
    padding-bottom: 24px;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 7px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
  }

  &:not(:last-child):after {
    content: "";
    position: absolute;
    left: 4px;
    top: 7px;
    height: 100%;
    width: 1px;
    background: ${props => props.theme.colors.primary};
  }

  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    &:not(:last-child) {
      padding-bottom: 12px;
    }
  `}
`

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  margin-left: 20px;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
    margin-left: 14px;
    margin-bottom: 2px;
  `}
`

const Date = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
  ${MediaRange.lessThan("mobile")`
    margin-left: 14px;
  `}
`
