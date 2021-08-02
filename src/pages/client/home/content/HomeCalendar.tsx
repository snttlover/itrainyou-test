import { IsAuthed } from "@/feature/user/IsAuthed"
import { IsGuest } from "@/feature/user/IsGuest"
import { date } from "@/lib/formatting/date"
import { routeNames } from "@/pages/route-names"
import { useEffect, useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import { Calendar } from "@/old-components/calendar/Calendar"
import { useEvent, useStore } from "effector-react"
import { Spinner } from "@/old-components/spinner/Spinner"
import { Button } from "@/old-components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"
import { GetCoachSessionsParamsTypes } from "@/lib/api/coach-sessions"
import { Link } from "react-router-dom"
import { showWithConditionWrapper } from "@/lib/hoc/showWithConditionWrapper"
import { Event, Store } from "effector-root"
import { Avatar } from "@/old-components/avatar/Avatar"
import starIcon from "@/old-components/coach-card/images/star.svg"
import { SessionRequestParams } from "@/lib/api/coach/create-session-request"
import { changeFreeBookedSession } from "@/pages/search/content/list/content/modals/book-sessions-status-modal.model"

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
  margin-right: 5px;
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
  padding: 16px 8px;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  color: #9AA0A6;
  
  ${MediaRange.between("mobile", "laptop")`
    text-align: unset;
    margin-left: auto;
  `}
`

const Datepicker = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdee0;
  padding-bottom: 4px;

  > div${Description} {
    margin-bottom: 12px;
  }
  
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
  padding-bottom: -2px;
  
  ${MediaRange.between("mobile", "laptop")`
    padding-bottom: 2px;
    border-bottom: 1px solid #dbdee0;
  `}
`

const Tag = styled.div<{ active?: boolean }>`
  cursor: pointer;
  width: 46px;
  margin: 0 8px 10px 0;
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
  padding-left: 19px;
  padding-top: 16px;

  ${MediaRange.lessThan("mobile")`
    padding-top: 24px;
  `}
`

const StyledBuyButton = styled(Button)`
  text-align: center;
  padding: 4px 35px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  width: 100%;
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

const ChooseTime = styled(Description)`
  margin-top: 0;
  
  ${MediaRange.greaterThan("desktop")`
    margin-top: 16px;
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
    margin-top: 12px;
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
  const [startDate, changeActiveStartDate] = useState<Date>(new Date())
  
  const sessions = useStore(props.freeSessionsModule.sessionsList)
  const loading = useStore(props.freeSessionsModule.loading)
  const buyLoading = useStore(props.freeSessionsModule.buySessionsLoading)

  const loadData = useEvent(props.freeSessionsModule.loadData)
  const toggleSession = useEvent(props.freeSessionsModule.toggleSession)
  const bulkFreeSession = useEvent(props.freeSessionsModule.bulkFreeSession)
  const changeModalInfo = useEvent(changeFreeBookedSession)

  const enabledDates = sessions.map(session => session.startDatetime)

  useEffect(() => {
    changeCurrentDate(date(enabledDates[0]).toDate())
  }, [enabledDates[0]])

  useEffect(() => {
    const dayJsDate = date(startDate);
    const firstMonthDay = new Date(dayJsDate.year(), dayJsDate.month(), 1);
    const lastMonthDay = new Date(dayJsDate.year(), dayJsDate.month() + 1, 0);
    console.log('4')
    loadData({
      params: {
        start_date__gte: date(firstMonthDay).format("YYYY-MM-DD"),
        start_date__lte: date(lastMonthDay).format("YYYY-MM-DD"),
      }
    })
  }, [startDate])

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

  const WidthCurrentDateConditionWrapper = showWithConditionWrapper(!!currentDate)

  const payForTheSessionHandler = () => {
    bulkFreeSession({session: selected[0].id, type: "BOOK"})
    changeModalInfo(selected[0])
    changeCurrentDate(null)
  }

  return (
    <Container>
      <Block onlyOneCard={true}>
        {loading && <Spinner />}
        <CalendarDirectionBlock>

          <Datepicker>
            <Description>Выберите день</Description>
            <StyledCalendar
              value={currentDate}
              enabledDates={enabledDates}
              onChange={changeCurrentDate}
              changeActiveStartDate={changeActiveStartDate}
              isBig={true}
              startFrom={new Date(date(currentDate || undefined).toDate())}
            />

          </Datepicker>
          <SelectTimeContainer>
            <WidthCurrentDateConditionWrapper>
              <ChooseTime>Выберите время</ChooseTime>
              <StyledDateHeader>{formattedDate}</StyledDateHeader>
              <Times>
                {times.map(session => (
                  <Tag active={session.selected} key={session.id} onClick={() => toggleSession(session)}>
                    {session.start_datetime}
                  </Tag>
                ))}
              </Times>
            </WidthCurrentDateConditionWrapper>
            {selected.length !== 0 ?
              <>
                <Description>Коуч</Description>
                <SessionInfo>
                  {selected.map((session, index) => (
                    <React.Fragment key={index}>
                      <RowBlock>
                        <StyledAvatar src={session.coach?.avatar}/>
                        <CoachName>{session.coach?.firstName} {session.coach?.lastName}</CoachName>
                      </RowBlock>
                      <RowBlock>
                        <Star/>
                        {session.coach.rating !== null && <Rating>{session.coach.rating}</Rating>}
                      </RowBlock>
                    </React.Fragment>
                  ))}
                </SessionInfo>
              </>
              : null
            }
            <ButtonContainer>
              <IsAuthed>
                <StyledBuyButton
                  disabled={buyLoading || selected.length === 0}
                  onClick={payForTheSessionHandler}
                >
                      Забронировать бесплатно
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