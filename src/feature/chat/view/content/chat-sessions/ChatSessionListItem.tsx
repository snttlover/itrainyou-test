import React from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { Link } from "react-router-dom"

type ChatSessionListItemTypes = {
  link: string
  avatar?: string
  timer?: string

  date: string
  time: string
}

export const ChatSessionListItem = (props: ChatSessionListItemTypes) => {
  return (
    <Container to={props.link}>
      <Header>
        <Date>{props.date}</Date>
        <Time>{props.time}</Time>
        {props.timer && <Timer>{props.timer}</Timer>}
      </Header>
    </Container>
  )
}

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #efefef;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Date = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  margin-right: 8px;
`

const Time = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const NoMaterials = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
  margin-top: 14px;
`

const Timer = styled.div`
  position: absolute;
  top: 12px;
  right: 8px;

  font-size: 12px;
  line-height: 16px;
  color: #5b6670;
`

const Counters = styled.div`
  display: flex;
  margin-top: 14px;
`

const Counter = styled.div`
  display: flex;
  align-items: center;
`

const CounterText = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  margin-left: 5px;
  margin-right: 9px;
`

const ImageIcon = styled(Icon).attrs({ name: "image" })`
  fill: ${props => props.theme.colors.primary};
  height: 12px;
`

const CameraIcon = styled(Icon).attrs({ name: "camera" })`
  fill: ${props => props.theme.colors.primary};
  height: 12px;
`

const DocumentIcon = styled(Icon).attrs({ name: "document" })`
  fill: ${props => props.theme.colors.primary};
  height: 12px;
`
