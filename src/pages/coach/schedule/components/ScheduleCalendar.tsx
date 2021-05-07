import { Header, LeftIcon, MonthContainer, MonthName, RightIcon } from "@/oldcomponents/calendar/CalendarHeader"
import { Icon } from "@/oldcomponents/icon/Icon"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import {
  $currentMonth, $isMobileSessionInfoShowed,
  $monthEndDate,
  $monthStartDate, setCurrentMonth,
  showAddSessionModal, showMobileSessionInfo, showVacationModal
} from "@/pages/coach/schedule/models/calendar.model"
import {
  $allSessions,
} from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import styled, { ThemeProps } from "styled-components"
import { removeSession } from "@/pages/coach/schedule/models/sessions.model"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { fixAvatarAndImageUrl } from "@/lib/helpers/fix-avatar-and-image-url"
import { Times, Time, RemoveIcon } from "@/pages/coach/schedule/components/MobileCalendarManager"
import { useClickOutside } from "@/oldcomponents/click-outside/use-click-outside"
import { AddSessionModal } from "@/pages/coach/schedule/components/AddSessionModal"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import {
  setAddSessionDate,
  setMobileInfo,
  $mobileEventInfo,
  $sessionDate
} from "@/pages/coach/schedule/models/add-session.model"
import { Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { AddVacationModal } from "@/pages/coach/schedule/components/AddVacationModal"
import { Informer } from "@/newcomponents/informer/Informer"


const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;

  ${MediaRange.lessThan("mobile")`
    min-width: 280px;
  `}
`
const MobileList = styled.div`
  display: none;
  flex-direction: column;

  ${MediaRange.lessThan("mobile")`
    display: flex;
    min-width: 280px;
    margin-top: 30px;
  `}
`

const ToolTip = styled.div<{show: boolean; bottomDirection: boolean; leftDirection: boolean; rightDirection: boolean }>`
  width: 240px;
  height: auto;
  position: absolute;
  z-index: 1000;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 6px 18px -6px rgba(0, 0, 0, 0.04);
  filter: drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.08));
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  transform:  ${({bottomDirection, rightDirection, leftDirection}) => {
    if (bottomDirection) {
      if (!rightDirection && !leftDirection) {
        return "translate(-2%,20%)"
      } else if (rightDirection) {
        return "translate(40%,20%)" 
      } else if (leftDirection) {
        return "translate(-40%,20%)" 
      }
    } else {
      if (!rightDirection && !leftDirection) {
        return "translate(-2%,-100%)"
      } else if (rightDirection) {
        return "translate(40%,-100%)"
      } else if (leftDirection) {
        return "translate(-40%,-100%)"
      }
    }
    return ""}};
  display: ${({show})=> !show ? "none" : "block"};

  &:after {
    content: " ";
    position: absolute;
    top: ${({bottomDirection}) => bottomDirection ? "unset" : "100%"};
    bottom: ${({bottomDirection}) => bottomDirection ? "100%" : "unset"};
    left: ${({rightDirection, leftDirection}) => { 
    if (!rightDirection && !leftDirection) {
      return "50%"
    } else {
      if (rightDirection) {
        return "10%"
      } else if (leftDirection) {
        return "85%"
      }
    }
    return ""}};
    border-width: 5px;
    border-style: solid;
    border-color: ${({bottomDirection}) => bottomDirection ? "transparent transparent white transparent" : "white transparent transparent transparent"};
  }
`

const StyledHeader = styled(Header)`
  padding-right: 4px;

  ${MediaRange.lessThan("mobile")`
    flex-direction: column-reverse;
    margin-bottom: 20px;
  `}
`

const AddVacationButton = styled(DashedButton)`
  width: 188px;

  ${MediaRange.lessThan("mobile")`
    align-self: flex-end;
    margin-bottom: 34px;
  `}
`

const ToolTipButton = styled(DashedButton)`
  width: 80%;
  max-width: 200px;
  align-self: center;

  ${MediaRange.lessThan("mobile")`
    margin-top: 30px;
  `}
`

const StyledMonthContainer = styled(MonthContainer)`
  padding: 0;
`

const StyledLeftIcon = styled(LeftIcon)`
  width: 40px;
  height: 40px;
`

const StyledRightIcon = styled(RightIcon)`
  width: 40px;
  height: 40px;
  margin-left: 8px;
`

const StyledMonthName = styled(MonthName)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  width: 150px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #424242;
`

const ToolTipHeader = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  align-self: flex-start;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`

const HorizontalOverflowScrollContainer = styled.div`
  overflow-y: auto;
  ${MediaRange.greaterThan("tablet")`
    margin-left: -4px;
  `}
`

const CalendarTable = styled.table`
  width: 100%;
  border-spacing: 0px;
  border-collapse: collapse;
`


const WeekRow = styled.tr<{weeks?: boolean}>`
  height: ${({weeks})=> weeks ? "100%" : "48px"};
  min-height: 48px;

  ${MediaRange.lessThan("mobile")`
    height: 12px;
    min-height: 12px;
  `}
`

const CalendarHeaderCell = styled.th`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5b6670;
  border: 1px solid #E1E6EA;
`

const CalendarCell = styled.td<{presentDay: boolean}>`
  width: 118px;
  border: 1px solid #E1E6EA;
  background-color: ${({presentDay})=> presentDay ? "#FFFFFF" : "#F9FAFC"};
  cursor: ${({presentDay})=> presentDay ? "pointer" : "default"};
  vertical-align: top;

  ${MediaRange.lessThan("mobile")`
    width: 12px;
    vertical-align: middle;
  `}
`

const SessionContent = styled.div<{areAvailable: boolean; googleEvent: boolean}>`
  position: relative;
  background: ${({areAvailable, theme})=> areAvailable ? theme.colors.primary : "#FFFFFF"};
  border-radius: 9px;
  border: ${({areAvailable})=> !areAvailable ? "1px dashed #DFD0E7" : ""};
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${({ areAvailable })=> !!areAvailable ? "#FFFFFF" : "#424242"};
  padding: 4px;
  display: flex;
  justify-content: center;
  text-align: left;
  text-decoration: ${({googleEvent})=> googleEvent ? "line-through" : "none"};

  &:hover ${ToolTip} {
     display: block;
   }
`

const SessionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  ${MediaRange.lessThan("mobile")`
    display: none;
  `}
`

const DayContainer = styled.div<{presentDay: boolean}>`
  min-height: 96px;
  background-color: ${({presentDay})=> presentDay ? "#FFFFFF" : "#F9FAFC"};
  position: relative;
  padding: 0px 4px 12px;
  ${SessionContent}:not(:first-child) {
    margin-top: 4px;
  }

  ${MediaRange.lessThan("mobile")`
    min-height: 12px;
    padding: 0;
    margin: 0;
  `}
`

const TopCellContainer = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
  `}
`

const Day = styled.span<{ weekend: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ weekend }) => (weekend ? "#FF6B00" : "#424242")};
`

const AddIcon = styled(Icon).attrs({ name: "cross" })`
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  fill: #9aa0a6;
  cursor: pointer;

  ${MediaRange.lessThan("mobile")`
    display: none;
  `}
`

const AddSessionIcon = styled(Icon).attrs({ name: "cross" })`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  fill: #9aa0a6;
  cursor: pointer;
  margin-right: 14px;
`

const MarkerIcon = styled(Icon).attrs({ name: "ellipse-list-marker" })<{ pinned: boolean}>`
  fill: ${props => props.theme.colors.primary};
  width: 4px;
  height: 4px;
  margin-top: 2px;
  display: none;

  ${MediaRange.lessThan("mobile")`
    display: ${
  // @ts-ignore
  ({ pinned }) => (pinned ? "flex" : "none")};
  `}
`

const ToolTipContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`

const UserName = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
  margin-bottom: 14px;
  
  ${MediaRange.lessThan("mobile")`
    margin-top: 24px;
    margin-bottom: 16px;
  `}
`

const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
  width: 90%;
  min-height: unset;
`

const StyledLink = styled.div`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 10px;

  ${MediaRange.lessThan("mobile")`
    margin-top: 24px;
    margin-bottom: 0;
  `}
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

type SessionType = {
  googleEvent: boolean
  areAvailable: boolean
  client?: [any]
  id: number
  sessionDurationType?: "D30" | "D45" | "D60" | "D90"
  startTime: Dayjs
  endTime: Dayjs
}

const MobileSessionInfoModal = () => {
  const toggle = useEvent(showMobileSessionInfo)
  const navigate = useEvent(navigatePush)

  const visibility = useStore($isMobileSessionInfoShowed)
  const session = useStore($mobileEventInfo)

  const _removeSession = useEvent(removeSession)

  const {id, client} = fixAvatarAndImageUrl(session)


  const handleOnClick = () => {
    _removeSession(session.id)
  }

  return (
    <StyledDialog value={visibility} onChange={toggle}>
      <ToolTipContainer>
        {session.googleEvent ?
          <>
            <Title>Этот слот заполнен в вашем google-календаре</Title>
            <ToolTipHeader>{session.startTime.format("DD MMM YYYY • HH:mm")}-{session.endTime.format("HH:mm")}</ToolTipHeader>
            <ToolTipButton onClick={() => toggle(false)}>Понятно</ToolTipButton>
          </>
          :
          (session.areAvailable ?
            <>
              <Title>Сессия забронирована</Title>
              <ToolTipHeader>{session.startTime.format("DD MMM YYYY • HH:mm")}-{session.endTime.format("HH:mm")}</ToolTipHeader>
              <UserInfo>
                <StyledAvatar src={client?.avatar || null} />
                <UserName>{client?.firstName} {client?.lastName}</UserName>
              </UserInfo>
              <StyledLink onClick={() => navigate({ url: routeNames.coachSession(id.toString())})}>На страницу сессии</StyledLink>
              <ToolTipButton onClick={handleOnClick}>Отменить сессию</ToolTipButton>
            </>
            :
            <>
              <Title>Этот слот еще не занят никем в вашем расписании</Title>
              <ToolTipHeader>{session.startTime.format("DD MMM YYYY • HH:mm")}-{session.endTime.format("HH:mm")}</ToolTipHeader>
              <ToolTipButton onClick={handleOnClick}>Удалить слот</ToolTipButton>
            </>
          )}
      </ToolTipContainer>
    </StyledDialog>
  )
}


const Session = (props: {session: SessionType; bottomToolTip: boolean; rightToolTip: boolean; leftToolTip: boolean }) => {

  const _removeSession = useEvent(removeSession)
  const navigate = useEvent(navigatePush)

  const [showed, setShowed] = useState(false)
  const {id, client} = fixAvatarAndImageUrl(props.session)

  const toolTipRef = useRef<HTMLDivElement>(null)

  const handleOnClick = () => {
    _removeSession(props.session.id)
  }

  const handleOnSessionClick = (e: React.SyntheticEvent, session: SessionType) => {
    setShowed(true)
    e.stopPropagation()
  }

  useClickOutside(toolTipRef, (e) => {
    setShowed(false)
  })

  return (
    <SessionContent
      onClick={(event) => handleOnSessionClick(event,props.session)}
      areAvailable={props.session.areAvailable}
      googleEvent={props.session.googleEvent}>
      {props.session.startTime.format("HH:mm")} - {props.session.endTime.format("HH:mm")}

      <ToolTip
        bottomDirection={props.bottomToolTip} 
        rightDirection={props.rightToolTip}
        leftDirection={props.leftToolTip}
        show={showed} >
        <ToolTipContainer ref={toolTipRef}>
          {props.session.googleEvent ?
            <div>Этот слот заполнен в вашем google-календаре</div>
            :
            (props.session.areAvailable ?
              <>
                <ToolTipHeader>Сессия забронирована</ToolTipHeader>
                <UserInfo>
                  <StyledAvatar src={client?.avatar || null} />
                  <UserName>{client?.firstName} {client?.lastName}</UserName>
                </UserInfo>
                <StyledLink onClick={() => navigate({ url: routeNames.coachSession(id.toString())})}>На страницу сессии</StyledLink>
                <ToolTipButton onClick={handleOnClick}>Отменить сессию</ToolTipButton>
              </>
              :
              <>
                <div>Этот слот еще не занят никем в вашем расписании</div>
                <ToolTipButton onClick={handleOnClick}>Удалить слот</ToolTipButton>
              </>
            )}
        </ToolTipContainer>
      </ToolTip>

    </SessionContent>
  )
}


const MobileSessions = () => {

  const sessions = useStore($allSessions)
  const currentDay = useStore($sessionDate)

  const _setMobileSessionInfoShow = useEvent(showMobileSessionInfo)
  const _setMobileEventInfo = useEvent(setMobileInfo)
  const _setAddSessionModalShow = useEvent(showAddSessionModal)


  const handleMobileEventOnClick = (session: SessionType) => {
    _setMobileEventInfo(session)
    _setMobileSessionInfoShow(true)
  }

  const onAddClick = () => {
    _setAddSessionModalShow(true)
  }

  return (
    <MobileList>
      <Row>
        <ToolTipHeader>{currentDay.format("D MMMM")}</ToolTipHeader>
        <AddSessionIcon onClick={onAddClick} />
      </Row>
      {sessions.sessions
        .filter(session => session.startTime.isSame(currentDay, "d")).map(session => (
          <Times key={session.id} >
            <Time googleEvent={session.googleEvent} primary={session.areAvailable} onClick={() => handleMobileEventOnClick(session)}>
              {session.startTime.format("HH:mm")}-{session.endTime.format("HH:mm")}
            </Time>
            <AddIcon onClick={onAddClick} />
          </Times>
        ))}
      <MobileSessionInfoModal />
    </MobileList>
  )
}

export const ScheduleCalendar = () => {
  const now = date()
  const currentMonth = date(useStore($currentMonth))
  const monthDayStart = date(useStore($monthStartDate))
  const sessions = useStore($allSessions)
  const monthDayEnd = date(useStore($monthEndDate))


  const _setAddSessionModalShow = useEvent(showAddSessionModal)

  const _setDate = useEvent(setAddSessionDate)
  const _setCurrentMonth = useEvent(setCurrentMonth)
  const _showVacationModal = useEvent(showVacationModal)

  const countPadStartDays = monthDayStart.weekday()
  const countPadEndDays = monthDayEnd.weekday() === 0 ? 0 : 6 - monthDayEnd.weekday()
  const daysCount = monthDayStart.daysInMonth() + countPadStartDays + countPadEndDays

  const weeks: Dayjs[][] = []
  let currentWeek = []
  for (let dayIndex = 0; dayIndex <= daysCount; dayIndex++) {
    if (dayIndex < countPadStartDays) {
      currentWeek.push(monthDayStart.subtract(countPadStartDays - dayIndex, "day"))
    } else if (dayIndex - countPadStartDays > monthDayStart.daysInMonth()) {
      currentWeek.push(monthDayEnd.add(countPadEndDays - (daysCount - dayIndex), "day"))
    } else {
      currentWeek.push(currentMonth.date(dayIndex - countPadStartDays + 1))
    }

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  }

  const formatter = "YYYYMM"
  const lessThanTheCurrentMonth = +currentMonth.format(formatter) <= +date().format(formatter)

  const onAddClick = (date: Dayjs) => {
    _setDate(date)
    _setAddSessionModalShow(true)
  }

  const handleOnCellClick = (day: Dayjs) => {
    if((now.isBefore(day, "d") || now.isSame(day, "d"))) {
      window.innerWidth > 480 ? onAddClick(day) : _setDate(day)
    }
  }

  const handleOnLeftIcon = () => {
    _setCurrentMonth(currentMonth.subtract(1, "month"))
  }

  const handleOnRightIcon = () => {
    _setCurrentMonth(currentMonth.add(1, "month"))
  }

  return (
    <CalendarContainer>
      <AddVacationModal />
      <AddSessionModal />
      <Container>
        <StyledHeader>
          <StyledMonthContainer>
            <StyledLeftIcon disabled={lessThanTheCurrentMonth} onClick={handleOnLeftIcon} />
            {window.innerWidth <= 480 ? <StyledMonthName>{currentMonth.format("MMMM")}, {currentMonth.format("YYYY")}</StyledMonthName> : null}
            <StyledRightIcon onClick={handleOnRightIcon} />
            {window.innerWidth > 480 ? <StyledMonthName>{currentMonth.format("MMMM")}, {currentMonth.format("YYYY")}</StyledMonthName> : null}
          </StyledMonthContainer>
          <AddVacationButton onClick={() => _showVacationModal(true)}>
          Добавить отпуск
          </AddVacationButton>
        </StyledHeader>
        <HorizontalOverflowScrollContainer>
          <CalendarTable>
            <thead>
              <WeekRow>
                <CalendarHeaderCell>Пн</CalendarHeaderCell>
                <CalendarHeaderCell>Вт</CalendarHeaderCell>
                <CalendarHeaderCell>Ср</CalendarHeaderCell>
                <CalendarHeaderCell>Чт</CalendarHeaderCell>
                <CalendarHeaderCell>Пт</CalendarHeaderCell>
                <CalendarHeaderCell>Сб</CalendarHeaderCell>
                <CalendarHeaderCell>Вс</CalendarHeaderCell>
              </WeekRow>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <WeekRow weeks key={weekIndex}>
                  {week.map((day, dayIndex) => (
                    <CalendarCell presentDay={now.isBefore(day, "d") || now.isSame(day, "d")} key={day.weekday()} onClick={() => handleOnCellClick(day)}>
                      <DayContainer presentDay={now.isBefore(day, "d") || now.isSame(day, "d")}>
                        <TopCellContainer>
                          {(now.isBefore(day, "d") || now.isSame(day, "d")) && <AddIcon onClick={() => handleOnCellClick(day)} />}
                          <Day weekend={day.weekday() >= 5}>{day.date()}</Day>
                          <MarkerIcon pinned={sessions.sessions.filter(session => session.startTime.isSame(day, "d")).length > 0} />
                        </TopCellContainer>
                        <SessionContainer>
                          {sessions.sessions
                            .filter(session => session.startTime.isSame(day, "d"))
                            .map(session => (
                              <Session 
                                key={session.id} 
                                rightToolTip={dayIndex === 0} 
                                leftToolTip={dayIndex === 6} 
                                bottomToolTip={weekIndex === 0} 
                                session={session} />
                            ))}
                        </SessionContainer>
                      </DayContainer>
                    </CalendarCell>
                  ))}
                </WeekRow>
              ))}
            </tbody>
          </CalendarTable>
        </HorizontalOverflowScrollContainer>
      </Container>
      <MobileSessions />
    </CalendarContainer>
  )
}
