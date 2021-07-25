import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { Avatar } from "@/old-components/avatar/Avatar"
import { Dayjs } from "dayjs"
import { Icon } from "@/old-components/icon/Icon"
import { Button } from "@/old-components/button/normal/Button"
import { connectToSession } from "@/old-components/layouts/behaviors/dashboards/call/create-session-call.model"

type SessionCardProps = { session: DashboardSession; children?: React.ReactNode; className?: string }

const getTimeText = (date: Dayjs) => date.format("HH:mm")

export const SessionCard = ({ session, className }: SessionCardProps) => {
  const history = useHistory()
  const now = date()
  const startDate = date(session.startDatetime)
  const endDate = date(session.endDatetime)
  const isStarted = now.isBetween(startDate, endDate, "minute")

  const minutesDiffText = `${endDate.diff(startDate, "minute")} мин`

  const clickHandler = () => {
    if (isStarted) {
      connectToSession(session.id)
    } else {
      history.push(`/client/sessions/${session.id}`)
    }
  }

  return (
    <SessionCardContainer className={className} data-is-started={isStarted} onClick={clickHandler}>
      <MobileTimeContainer>
        {getTimeText(startDate)} – {getTimeText(endDate)}
        <RightArrow />
      </MobileTimeContainer>
      <DesktopTimeContainer>{getTimeText(startDate)}</DesktopTimeContainer>
      <SessionDescription>
        <Info>
          <DesktopExtendedTime>
            до {getTimeText(endDate)}, {minutesDiffText}
          </DesktopExtendedTime>
          <MobileExtendedTime>{minutesDiffText}</MobileExtendedTime>
          <Name>
            {session.coach.firstName} {session.coach.lastName}
          </Name>
        </Info>
        <Actions>
          <CoachAvatar src={session.coach.avatar} />
          {isStarted && <ConnectButton>Присоединиться</ConnectButton>}
          {!isStarted && <AboutButton>Подробнее</AboutButton>}
        </Actions>
      </SessionDescription>
      {isStarted && <MobileConnectButton>Присоединиться</MobileConnectButton>}
    </SessionCardContainer>
  )
}

const AboutButton = styled(Button).attrs({ "data-secondary": true })`
  display: none;
  justify-content: center;
`

const ConnectButton = styled(Button)`
  display: none;
  justify-content: center;
`

const MobileConnectButton = styled(Button)`
  display: none;
  width: 100%;
  margin-top: 16px;
  justify-content: center;
  ${MediaRange.lessThan("mobile")`
    display: flex;
  `}
`

const MobileTimeContainer = styled.div`
  display: none;
  justify-content: space-between;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #444444;
`

const RightArrow = styled(Icon).attrs({ name: "right-arrow" })`
  stroke: #e1e6ea;
  height: 16px;
`

const DesktopTimeContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  background: #f4f5f7;
  color: #424242;
`

const SessionDescription = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`

const DesktopExtendedTime = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #9aa0a6;
`

const MobileExtendedTime = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #9da2a6;
  display: none;
`

const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-top: 2px;
  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 22px;
    color: #444444;
  `}
`

const Actions = styled.div``

const CoachAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`

const SessionCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 8px;
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  color: #424242;

  &[data-is-started="true"] {
    ${DesktopTimeContainer} {
      background: #fff;
      color: ${props => props.theme.colors.primary};
      border: 1px solid ${props => props.theme.colors.primary};
    }
    ${DesktopExtendedTime} {
      color: ${props => props.theme.colors.primary};
    }
  }
  &:hover {
    ${CoachAvatar} {
      display: none;
    }
    ${ConnectButton}, ${AboutButton} {
      display: block;
    }
  }
  ${MediaRange.lessThan("mobile")`
    &:hover {
      ${CoachAvatar} {
        display: flex;
      }
      ${ConnectButton}, ${AboutButton} {
        display: none;
      }
    }
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    ${DesktopTimeContainer} {
      display: none;
    }
    ${MobileTimeContainer} {
      display: flex;
      width: 100%;
    }
    ${DesktopExtendedTime} {
      display: none;
    }
    ${MobileExtendedTime} {
      display: flex;
    }
    ${Info} {
      margin-left: 0;
    }
    ${SessionDescription} {
      width: 100%;
      margin-top: 16px;
    }
  `}
`
