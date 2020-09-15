import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { Link } from "react-router-dom"
import * as React from "react"

const NotificationButton = styled(Icon).attrs({ name: `notification` })`
  width: 27px;
  height: auto;
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  ${MediaRange.lessThan(`tablet`)`
    width: 31px;
    fill: #fff;
  `}
  ${MediaRange.lessThan(`mobile`)`
    width: 25px;
  `}
`

const Counter = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;

  background: #ff6b00;
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 8px;
  line-height: 16px;
  color: #fff;
  right: -2px;
  bottom: -2px;
`

const NotificationLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

type NotificationIconProps = {
  link: string
  count: number
}

export const NotificationIcon = (props: NotificationIconProps) => {
  return (
    <NotificationLink to={props.link}>
      <NotificationButton />
      {!!props.count && <Counter>{props.count}</Counter>}
    </NotificationLink>
  )
}
