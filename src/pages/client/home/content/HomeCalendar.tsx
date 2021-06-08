import { IsAuthed } from "@/feature/user/IsAuthed"
import { IsGuest } from "@/feature/user/IsGuest"
import { date } from "@/lib/formatting/date"
import { routeNames } from "@/pages/route-names"
import { useEffect, useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import { Calendar } from "@/oldcomponents/calendar/Calendar"
import { useEvent, useStore } from "effector-react"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { Button } from "@/oldcomponents/button/normal/Button"
import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { CoachSession, DurationType, GetCoachSessionsParamsTypes } from "@/lib/api/coach-sessions"
import { Link } from "react-router-dom"
import { showWithConditionWrapper } from "@/lib/hoc/showWithConditionWrapper"
import { Event, Store } from "effector-root"
import { Avatar } from "@/oldcomponents/avatar/Avatar"
import starIcon from "@/oldcomponents/coach-card/images/star.svg"
import { SessionRequestParams } from "@/lib/api/coach/create-session-request"


type StyledTabTypes = {
  onlyOneCard: boolean
}

const Container = styled.div`
  width: 268px;
  margin-bottom: 20px;
  position: relative;

  ${MediaRange.lessThan("laptop")`
     width: 100%;
     margin-bottom: 0;
  `}

  ${MediaRange.lessThan("mobile")`
     width: 288px;
     margin-bottom: 0;
  `}
`

const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const SessionInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 17px;
`

const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`

const CoachName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #424242;
`

const Star = styled.img.attrs({ src: starIcon })`
  width: 14px;
  height: 14px;
`

const Rating = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.colors.primary};
`

const Block = styled.div<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 8px 12px;
`

const Datepicker = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdee0;
  padding-bottom: 4px;
  ${MediaRange.between("mobile", "laptop")`
     width: 50%;
     padding-right: 20px;
     padding-left: 20px;
     border-right: 1px solid #DBDEE0;
     border-bottom: none;
  `}
  ${MediaRange.lessThan("mobile")`
    margin-right: 26px;
    margin-left: 26px;
    padding-bottom: 12px;
    border-bottom: none;
  `}
`

const SelectTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;

  ${MediaRange.between("mobile", "laptop")`
    margin: 0 auto;
    width: 252px;
  `}
`

const Times = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  padding-left: 12px;
  padding-bottom: 8px;
  
  ${MediaRange.between("mobile", "laptop")`
    padding-bottom: 12px;
    border-bottom: 1px solid #dbdee0;
  `}
`

const Tag = styled.div<{ active?: boolean }>`
  cursor: pointer;
  width: 46px;
  margin-right: 8px;
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  background: ${({ active }) => (active ? "#4858CC" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#5B6670")};
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  ${MediaRange.greaterThan("tablet")`
    &:hover {
      background: #DBDEE0;
      color: #fff;
    }
  `}
`

const RubleIcon = styled(Icon).attrs({ name: "ruble" })`
  width: 15px;
  height: 15px;
  fill: #4858cc;
`

const SummaryRuble = styled(RubleIcon)`
  width: 20px;
  height: 20px;
`

const Summary = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #4858cc;
  display: flex;
  align-items: center;
`

const ButtonContainer = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`

const StyledDateHeader = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding-left: 12px;
  padding-top: 16px;

  ${MediaRange.lessThan("mobile")`
    padding-top: 24px;
  `}
`

const OnlyOneTabStyles = css`
  justify-content: flex-end;
  padding-top: 16px;
  padding-bottom: 8px;
`

const SelectedSession = styled.div`
  display: flex;
  margin-top: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid #efefef;
  width: 216px;
  align-items: center;
  &:first-child {
    margin-top: 0;
  }

  ${MediaRange.lessThan("mobile")`
    width: 252px;
  `}
`

const SessionDate = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  margin-right: 8px;
`

const SessionTime = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: left;
  color: #424242;
  flex: 1;
`

const SessionPrice = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #424242;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBuyButton = styled(Button)`
  text-align: center;
  padding: 4px 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  width: 160px;
`

const StyledRegisterButton = styled(Button)`
  text-align: center;
  padding: 4px 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  width: 185px;
`


const CalendarSubTitle = styled.div`
  text-align: right;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #5B6670;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  color: #9AA0A6;
  margin-top: 24px;
  
  ${MediaRange.between("mobile", "laptop")`
    margin-top: 12px;
    text-align: unset;
    margin-left: auto;
  `}
`

const StyledCalendar = styled(Calendar)`
  ${MediaRange.between("mobile", "laptop")`
    max-width: 252px;
    margin: 0 auto;
    border-top: 0;
 `}

  ${MediaRange.lessThan("mobile")`
    border-top: 0;
    border-bottom: 1px solid #dbdee0;
 `}
`

const CalendarDirectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  ${MediaRange.between("mobile", "laptop")`
    flex-direction: row;
 `}
`

const equalDateFormat = "DDMMYYYY"
const equalTimeFormat = "HH:mm"

type Types = CoachSession & {
  selected: boolean
}

type FreeSessionTypes = {
  freeSessionsModule: {
    loading: Store<boolean>
    loadData: Event<{
      id?: number
      params: GetCoachSessionsParamsTypes
    }>
    sessionsList: Store<any[]>
    toggleSession: Event<any>
    deleteSession: Event<number>
    bulkFreeSession: Event<SessionRequestParams>
    buySessionsLoading: Store<boolean>
  }
}

export const HomeCalendar = (props: FreeSessionTypes) => {
  const [currentDate, changeCurrentDate] = useState<Date | null | undefined>(undefined)

  const sessions = useStore(props.freeSessionsModule.sessionsList)
  const loading = useStore(props.freeSessionsModule.loading)
  const buyLoading = useStore(props.freeSessionsModule.buySessionsLoading)
  //const activeTab = useStore(props.freeSessionsModule.tabs.$durationTab)

  const loadData = useEvent(props.freeSessionsModule.loadData)
  //const changeActiveTab = useEvent(props.freeSessionsModule.tabs.changeDurationTab)
  const deleteSession = useEvent(props.freeSessionsModule.deleteSession)
  const toggleSession = useEvent(props.freeSessionsModule.toggleSession)
  const bulkFreeSession = useEvent(props.freeSessionsModule.bulkFreeSession)


  const enabledDates = sessions.map(session => session.startDatetime)
  useEffect(() => {
    changeCurrentDate((prevState) => {
      return enabledDates[0] && prevState === undefined ? date(enabledDates[0]).toDate() : prevState
    })
    return () => {
      changeCurrentDate(undefined)
    }
  }, [enabledDates[0]])

  useEffect(() => {
    loadData({params:{}})
  }, [])


  const headerDate = currentDate || new Date()
  const formattedDate = date(headerDate).format("DD MMMM")
  const currentDateEqual = date(headerDate as Date).format(equalDateFormat)

  const times = sessions
    .filter(session => {
      return date(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: date(session.startDatetime).format(equalTimeFormat),
    }))

  const selected = sessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: date(session.startDatetime).format("DD.MM.YY"),
      time: date(session.startDatetime).format(equalTimeFormat),
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)


  const WidthAmountConditionWrapper = showWithConditionWrapper(!!amount)
  const WidthCurrentDateConditionWrapper = showWithConditionWrapper(!!currentDate)


  const payForTheSessionHandler = () => {
    bulkFreeSession({session: selected[0].id, type: "BOOK"})
    changeCurrentDate(null)
  }

  return (
    <Container>
      <Block onlyOneCard={true}>
        <CalendarSubTitle>Бесплатные сессии</CalendarSubTitle>
        {loading && <Spinner />}
        <CalendarDirectionBlock>

          <Datepicker>
            <Description>Выберите день</Description>
            <StyledCalendar
              value={currentDate}
              enabledDates={enabledDates}
              onChange={changeCurrentDate}
              isBig={true}
              startFrom={new Date(date(currentDate || undefined).toDate())}
            />

          </Datepicker>
          <SelectTimeContainer>
            <WidthCurrentDateConditionWrapper>
              <Description>Выберите время</Description>
              <StyledDateHeader>{formattedDate}</StyledDateHeader>
              <Times>
                {times.map(session => (
                  <Tag active={session.selected} key={session.id} onClick={() => toggleSession(session)}>
                    {session.start_datetime}
                  </Tag>
                ))}
              </Times>
            </WidthCurrentDateConditionWrapper>
            <Description>Коуч</Description>
            <SessionInfo>
              {selected.map(session => (
                <>
                  <RowBlock>
                    <StyledAvatar src={session.coach?.avatar} />
                    <CoachName>{session.coach?.firstName} {session.coach?.lastName}</CoachName>
                  </RowBlock>
                  <RowBlock>
                    <Star />
                    {session.coach.rating !== null && <Rating>{session.coach.rating}</Rating>}
                  </RowBlock>
                </>
              ))}
            </SessionInfo>
            <ButtonContainer>
              <IsAuthed>
                <StyledBuyButton
                  disabled={buyLoading || selected.length === 0}
                  onClick={payForTheSessionHandler}
                >
                      Забронировать
                </StyledBuyButton>
              </IsAuthed>
              <IsGuest>
                <Link to={routeNames.signup("1")}>
                  <StyledRegisterButton>Зарегистрироваться</StyledRegisterButton>
                </Link>
              </IsGuest>
            </ButtonContainer>
          </SelectTimeContainer>
        </CalendarDirectionBlock>
      </Block>
    </Container>
  )
}