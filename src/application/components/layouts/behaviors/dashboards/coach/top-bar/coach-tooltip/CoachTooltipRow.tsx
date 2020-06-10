import styled from "styled-components"
import { Icon } from "@/application/components/icon/Icon"
import Link from "next/link"

const Container = styled.div`
  display: flex;
  color: #ffffff;
  align-items: center;
  padding: 12px 13px;
  background: #000;
  border-radius: 4px;
`

const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  flex: 1;
  width: 60px;
`

type CoachTooltipRowTypes = {
  label: string
  notificationsCount: number
  messagesCount: number
  to: string
  className?: string
}

const NotificationIcon = styled(Icon).attrs({ name: `notification` })`
  fill: #fff;
  width: 16px;
  margin-right: 6px;
`

const PeopleNotificationIcon = styled(Icon).attrs({ name: `people-notification` })`
  fill: #fff;
  width: 16px;
  margin-right: 6px;
`

const Counter = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  width: 30px;
`

export const CoachTooltipRow = (props: CoachTooltipRowTypes) => (
  <Link href={props.to}>
    <Container className={props.className}>
      <Label>{props.label}</Label>
      <NotificationIcon />
      <Counter>{ props.notificationsCount ? `+ ${props.notificationsCount}` : 0 }</Counter>
      <PeopleNotificationIcon />
      <Counter>{ props.messagesCount ? `+ ${props.messagesCount}` : 0 }</Counter>
    </Container>
  </Link>
)
