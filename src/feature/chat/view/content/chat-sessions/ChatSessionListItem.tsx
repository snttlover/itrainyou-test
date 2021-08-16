import React from "react"
import styled from "styled-components"
import { Icon } from "@/old-components/icon/Icon"
import { Link } from "react-router-dom"

type ChatSessionListItemTypes = {
  link: string
  avatar?: string
  timer?: string
  duration: string

  date: string
  time: string
  inFuture: boolean
}

export const ChatSessionListItem = (props: ChatSessionListItemTypes) => {
  return (
    <Container to={props.link} data-in-future={props.inFuture}>
      <Header>
        <Date>{props.date}</Date>
        <Time>
          {props.duration} • {props.time}
        </Time>
      </Header>
      <RightIcon />
    </Container>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Date = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 4px;
`

const Time = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #5b6670;
`

const RightIcon = styled(Icon).attrs({ name: "right-icon" })`
  fill: #efefef;
  width: 12px;
`

const Container = styled(Link)`
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 9px;
  border-bottom: 1px solid #f4f5f7;
  &[data-in-future="false"] {
    ${Date} {
      color: #9aa0a6;
    }
    ${Time} {
      color: #9aa0a6;
    }
    ${RightIcon} {
      fill: #efefef;
    }
  }
`
