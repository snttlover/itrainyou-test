import { Header, LeftIcon, MonthContainer, MonthName, RightIcon, Year } from "@/oldcomponents/calendar/CalendarHeader"
import { Icon } from "@/oldcomponents/icon/Icon"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { $currentMonth, $monthEndDate, $monthStartDate } from "@/pages/coach/schedule/models/calendar.model"
import {
  $allSessions,
  $deleteButtonIsDisabled, $pickedDeleteRange, changePickedDeleteRange,
  removeSessionsRange
} from "@/pages/coach/schedule/models/sessions.model"
import { Dayjs } from "dayjs"
import { useEvent, useStore } from "effector-react"
import React, { useEffect, useRef, useState } from "react"
import styled, { ThemeProps } from "styled-components"
import { startRemovingSession } from "@/pages/coach/schedule/models/remove-session.model"
import { removeSession } from "@/pages/coach/schedule/models/sessions.model"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { GrayTooltip } from "@/oldcomponents/gray-tooltip/GrayTooltip"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import { fixAvatarAndImageUrl } from "@/lib/helpers/fix-avatar-and-image-url"
import { Times, Time, RemoveIcon } from "@/pages/coach/schedule/components/MobileCalendarManager"
import { DurationType } from "@/lib/api/coach-sessions"
import { useClickOutside } from "@/oldcomponents/click-outside/use-click-outside"
import { AddSessionModal } from "@/pages/coach/schedule/components/AddSessionModal"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import {
  setAddSessionDate,
  showAddSessionModal,
  showMobileSessionInfo,
  $isMobileSessionInfoShowed,
  setMobileInfo,
  $mobileEventInfo,
} from "@/pages/coach/schedule/models/add-session.model"
import { Description, Title } from "@/pages/coach/schedule/CoachSchedulePage"


const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 704px;

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
  `}
`

//bottom:  ${({bottomDirection}) => !bottomDirection ? "unset" : "105%"};
//top: ${({bottomDirection}) => !bottomDirection ? "unset" : "105%"};
const VerticalToolTip = styled.div<{show: boolean; bottomDirection: boolean }>`
  width: 240px;
  height: auto;
  position: absolute;
  z-index: 1000;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
  transform:  ${({bottomDirection}) => !bottomDirection ? "translateY(12%)" : "translateY(-105%)"};
  left: -100%;
  display: ${({show})=> !show ? "none" : "block"};

  &:after {
    content: " ";
    position: absolute;
    top: ${({bottomDirection}) => !bottomDirection ? "unset" : "100%"};
    bottom: ${({bottomDirection}) => !bottomDirection ? "100%" : "unset"};
    left: 50%;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`
/*
content: "";
         position: absolute;
         bottom: 100%;
         left: 50%;
         margin-left: -10px;
         border-width: 3px;
         border-style: solid;
         border-color: transparent transparent blue transparent;*/

const StyledHeader = styled(Header)`
  max-width: 700px;
  padding-right: 4px;

  ${MediaRange.lessThan("mobile")`
    flex-direction: column-reverse;
  `}
`

const AddVacationButton = styled(DashedButton)`
  width: 188px;
`

const ToolTipButton = styled(DashedButton)`
  width: 80%;
  max-width: 200px;
  align-self: center;
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
  border: 1px solid #F4F5F7;
`

const CalendarCell = styled.td<{presentDay: boolean}>`
  width: 96px;
  border: 1px solid #F4F5F7;
  background-color: ${({presentDay})=> presentDay ? "#FFFFFF" : "#F9FAFC"};
  cursor: ${({presentDay})=> presentDay ? "pointer" : "default"};
  vertical-align: top;

  ${MediaRange.lessThan("mobile")`
    width: 12px;
    vertical-align: middle;
  `}
`

const Session = styled.div<{areAvailable: boolean; googleEvent: boolean}>`
  position: relative;
  background: ${({areAvailable})=> areAvailable ? "#eaa6ff" : "#FFFFFF"};
  border-radius: 9px;
  border: ${({areAvailable})=> !areAvailable ? "1px dashed #DFD0E7" : ""};
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  text-decoration: ${({googleEvent})=> googleEvent ? "line-through" : "none"};

  &:hover ${VerticalToolTip} {
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
  width: 96px;
  min-height: 96px;
  background-color: ${({presentDay})=> presentDay ? "#FFFFFF" : "#F9FAFC"};
  position: relative;
  padding: 24px 4px 12px;
  ${Session}:not(:first-child) {
    margin-top: 4px;
  }

  ${MediaRange.lessThan("mobile")`
    width: 12px;
    min-height: 12px;
  `}
`

const Day = styled.span<{ weekend: boolean }>`
  position: absolute;
  left: 8px;
  top: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${({ weekend }) => (weekend ? "#FF6B00" : "#424242")};
`

const AddIcon = styled(Icon).attrs({ name: "cross" })`
  position: absolute;
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  fill: #9aa0a6;
  top: 4px;
  right: 4px;
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
  display: none;

  ${MediaRange.lessThan("mobile")`
    display: ${
  // @ts-ignore
  ({ pinned }) => (pinned ? "flex" : "none")};
  `}
`

const CrossIcon = styled(Icon).attrs({ name: "cross" })`
  width: 16px;
  height: 16px;
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
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
  margin-top: 24px;
  margin-bottom: 16px;
`

const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
  width: 90%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export type ScheduleCalendarTypes = {
  prevMonth: (currentMonth: Dayjs) => void
  nextMonth: (currentMonth: Dayjs) => void
  showVacationModal: (value: boolean) => void
}

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
              <ToolTipButton onClick={handleOnClick}>Отменить сессию</ToolTipButton>
            </>
            :
            <>
              <Title>Этот слот еще не занят никем в вашем расписании</Title>
              <ToolTipButton onClick={handleOnClick}>Удалить слот</ToolTipButton>
            </>
          )}
      </ToolTipContainer>
    </StyledDialog>
  )
}

const ToolTipContent = (props: {session: SessionType }) => {

  //const _removeSession = useEvent(startRemovingSession)
  const _removeSession = useEvent(removeSession)

  const {id, client} = fixAvatarAndImageUrl(props.session)

  const handleOnClick = () => {
    _removeSession(props.session.id)
  }

  return (
      <ToolTipContainer>
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
              <ToolTipButton onClick={handleOnClick}>Отменить сессию</ToolTipButton>
            </>
            :
            <>
              <div>Этот слот еще не занят никем в вашем расписании</div>
              <ToolTipButton onClick={handleOnClick}>Удалить слот</ToolTipButton>
            </>
          )}
      </ToolTipContainer>
  )
}

const Sessions = (props: {day: Dayjs; toolTipDirection: number }) => {

  const sessions = useStore($allSessions)

  const [showedToolTipId, setShow] = useState<{sessionId: null | number}>({sessionId: null})

  const handleOnSessionClick = (e: React.SyntheticEvent, session: SessionType) => {
    setShow({sessionId: session.id})
    e.stopPropagation()
  }

  const toolTipRef = useRef(null)


  // ToDo: придумать как пофиксить утечку памяти
  useClickOutside(toolTipRef, (e) => {
    setShow({sessionId: null})
  })

  return (
    <SessionContainer>
      {sessions.sessions
        .filter(session => session.startTime.isSame(props.day, "d"))
        .map(session => (
          <Session
            onClick={(event) => handleOnSessionClick(event,session)}
            key={session.id} googleEvent={session.googleEvent}
            areAvailable={session.areAvailable} >
            {session.startTime.format("HH:mm")}-{session.endTime.format("HH:mm")}
            <VerticalToolTip bottomDirection={props.toolTipDirection === 0} show={showedToolTipId.sessionId === session.id} >
            <ToolTipContent  session={session} />
            </VerticalToolTip>
          </Session>
        ))}
    </SessionContainer>
  )
}

const MobileSessions = (props: {currentDay: Dayjs}) => {

  const sessions = useStore($allSessions)

  const _setMobileSessionInfoShow = useEvent(showMobileSessionInfo)
  const _setMobileEventInfo = useEvent(setMobileInfo)
  const _setDate = useEvent(setAddSessionDate)
  const _setAddSessionModalShow = useEvent(showAddSessionModal)


  const handleMobileEventOnClick = (session: SessionType) => {
    _setMobileEventInfo(session)
    _setMobileSessionInfoShow(true)
  }

  const onAddClick = (date: Dayjs) => {
    _setDate(date)
    _setAddSessionModalShow(true)
  }

  return (
    <MobileList>
      <Row>
        <ToolTipHeader>{props.currentDay.format("D MMMM")}</ToolTipHeader>
        <AddSessionIcon onClick={() => onAddClick(props.currentDay)} />
      </Row>
      {sessions.sessions
        .filter(session => session.startTime.isSame(props.currentDay, "d")).map(session => (
          <Times key={session.id} >
            <Time googleEvent={session.googleEvent} primary={session.areAvailable} onClick={() => handleMobileEventOnClick(session)}>
              {session.startTime.format("HH:mm")}-{session.endTime.format("HH:mm")}
            </Time>
            <AddIcon onClick={() => onAddClick(props.currentDay)} />
          </Times>
        ))}
      <MobileSessionInfoModal />
    </MobileList>
  )
}

export const ScheduleCalendar: React.FC<ScheduleCalendarTypes> = ({ prevMonth, nextMonth, showVacationModal }) => {
  const now = date()
  const currentMonth = date(useStore($currentMonth))
  const monthDayStart = date(useStore($monthStartDate))
  const sessions = useStore($allSessions)
  const monthDayEnd = date(useStore($monthEndDate))

  const _setMobileSessionInfoShow = useEvent(showMobileSessionInfo)
  const _setAddSessionModalShow = useEvent(showAddSessionModal)

  const _setDate = useEvent(setAddSessionDate)
  const _setMobileEventInfo = useEvent(setMobileInfo)

  const _removeSession = useEvent(startRemovingSession)
  const _removeSessionsRange = useEvent(removeSessionsRange)
  const disabledDelete = useStore($deleteButtonIsDisabled)
  const range = useStore($pickedDeleteRange)
  const setRange = useEvent(changePickedDeleteRange)


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

  const [currentDay, setCurrentDay] = useState<Dayjs>(date())


  const onAddClick = (date: Dayjs) => {
    _setDate(date)
    _setAddSessionModalShow(true)
  }

  const handleOnCellClick = (day: Dayjs) => {
    if((now.isBefore(day, "d") || now.isSame(day, "d"))) {
      window.innerWidth > 480 ? onAddClick(day) : setCurrentDay(day)
    }
  }

  return (
    <CalendarContainer>
      <AddSessionModal />
      <Container>
        <StyledHeader>
          <StyledMonthContainer>
            <StyledLeftIcon disabled={lessThanTheCurrentMonth} onClick={() => prevMonth(currentMonth)} />
            {window.innerWidth <= 480 ? <StyledMonthName>{currentMonth.format("MMMM")}, {currentMonth.format("YYYY")}</StyledMonthName> : null}
            <StyledRightIcon onClick={() => nextMonth(currentMonth)} />
            {window.innerWidth > 480 ? <StyledMonthName>{currentMonth.format("MMMM")}, {currentMonth.format("YYYY")}</StyledMonthName> : null}
          </StyledMonthContainer>
          {/*<AddVacationButton disabled={disabledDelete} onClick={() => _removeSessionsRange(range)}>
          Добавить отпуск
        </AddVacationButton>*/}
          <AddVacationButton onClick={() => showVacationModal(true)}>
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
              {weeks.map((week, i) => (
                <WeekRow weeks key={i}>
                  {week.map((day, i) => (
                    <CalendarCell presentDay={now.isBefore(day, "d") || now.isSame(day, "d")} key={day.weekday()} onClick={() => handleOnCellClick(day)}>
                      <DayContainer presentDay={now.isBefore(day, "d") || now.isSame(day, "d")}>
                        <Day weekend={day.weekday() >= 5}>{day.date()}</Day>
                        {(now.isBefore(day, "d") || now.isSame(day, "d")) && <AddIcon onClick={() => handleOnCellClick(day)} />}
                        <MarkerIcon pinned={sessions.sessions.filter(session => session.startTime.isSame(day, "d")).length > 0} />
                        <Sessions toolTipDirection={i} day={day} />
                      </DayContainer>
                    </CalendarCell>
                  ))}
                </WeekRow>
              ))}
            </tbody>
          </CalendarTable>
        </HorizontalOverflowScrollContainer>
      </Container>
      <MobileSessions currentDay={currentDay} />
    </CalendarContainer>
  )
}
