import { IsAuthed } from "@/feature/user/IsAuthed"
import { IsGuest } from "@/feature/user/IsGuest"
import { date } from "@/lib/formatting/date"
import { routeNames } from "@/pages/route-names"
import { useEffect, useMemo, useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import { Calendar } from "@/oldcomponents/calendar/Calendar"
import { useEvent, useStore } from "effector-react"
import { Tabs, Tab } from "@/oldcomponents/tabs/Tabs"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { Button } from "@/oldcomponents/button/normal/Button"
import { genSessionTabs, SelectDatetimeTypes } from "@/oldcomponents/coach-card/select-date/SelectDatetime"
import { Icon } from "@/oldcomponents/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { DurationType } from "@/lib/api/coach-sessions"
import { Link } from "react-router-dom"
import { showWithConditionWrapper } from "@/lib/hoc/showWithConditionWrapper"
import { toggleCreditCardsModal } from "@/pages/search/coach-by-id/models/units"
import { changeFreeBookedSession } from "@/pages/search/content/list/content/modals/book-sessions-status-modal.model"
import { navigatePush } from "@/feature/navigation"

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
`

const Block = styled.div<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 8px;
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

const CalendarDirectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  ${MediaRange.between("mobile", "laptop")`
    flex-direction: row;
 `}
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
  border-bottom: 1px solid #dbdee0;
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

const DeleteIcon = styled(Icon).attrs({ name: "delete" })`
  fill: #4858cc;
  width: 15px;
  height: 15px;
  cursor: pointer;
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

const StyledTabs = styled(Tabs)`
  width: 100%;
  position: relative;
`

const StyledDateHeader = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  padding-left: 12px;
  padding-top: 16px;

  ${MediaRange.lessThan("mobile")`
    border-top: 1px solid #DBDEE0;
    padding-top: 24px;
  `}
`

const StyledTab = styled(Tab)<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  padding: 8px 13px;
  ${MediaRange.between("mobile", "laptop")`
    flex-direction: row;
  `}
`

const TabTime = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5b6670;
  ${MediaRange.between("mobile", "laptop")`
    font-size: 16px;
    line-height: 22px;
  `}
`

const TabPrice = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  color: #9aa0a6;
`

const SelectedSessions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 27px;
  padding-bottom: 16px;
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
  padding: 4px 40px;
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

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  margin: 0 auto;
  ${MediaRange.lessThan("mobile")`
    width: 252px;
  `}
`

const AmountText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const StyledCalendar = styled(Calendar)`
  ${MediaRange.between("mobile", "laptop")`
    max-width: 252px;
    margin: 0 auto;
 `}
`

const Delemiter = styled.div`
  display: none;
  ${MediaRange.between("mobile", "laptop")`
    display: flex;
  `}
`

const equalDateFormat = "DDMMYYYY"
const equalTimeFormat = "HH:mm"

export type CoachDatepickerTypes = SelectDatetimeTypes & {
  preSelectedDate?: Date
  preSelectedSessions?: number[]
}

export const CoachDatepicker = (props: CoachDatepickerTypes) => {
  const [currentDate, changeCurrentDate] = useState<Date | null | undefined>(props.preSelectedDate)

  const _toggleCreditCardModal = useEvent(toggleCreditCardsModal)

  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const buyLoading = useStore(props.sessionsData.buySessionsLoading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)

  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)
  const deleteSession = useEvent(props.sessionsData.deleteSession)
  const toggleSession = useEvent(props.sessionsData.toggleSession)
  const bulkSession = useEvent(props.sessionsData.bulkSession)
  const changeFreeSessionModalInfo = useEvent(changeFreeBookedSession)

  const tabs = useMemo(() => genSessionTabs(props.coach), [props.coach])

  const navigate = useEvent(navigatePush)

  const enabledDates = sessions.map(session => session.startDatetime)
  useEffect(() => {
    if (!props.preSelectedDate) {
      changeCurrentDate((prevState) => {
        return enabledDates[0] && prevState === undefined ? date(enabledDates[0]).toDate() : prevState
      })
    }
    return () => {
      changeCurrentDate(props.preSelectedDate)
    }
  }, [enabledDates[0]])

  useEffect(() => {
    return () => {
      if (activeTab !== "PROMO" && tabs.length) {
        changeActiveTab(tabs[0].key)
      }
    }
  }, [])


  const headerDate = currentDate || new Date()
  const formattedDate = date(
    headerDate,
    undefined,
    undefined,
    true,
  ).format("DD MMMM")
  const currentDateEqual = date(
    headerDate as Date,
    undefined,
    undefined,
    true,
  ).format(equalDateFormat)

  if (activeTab !== "PROMO" && !props.coach.prices[activeTab] && tabs.length) {
    changeActiveTab(tabs[0].key)
  }

  const times = sessions
    .filter(session => {
      return date(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: date(session.startDatetime).format(equalTimeFormat),
    }))

  const selected = sessions
    .filter(session => session.selected || (props.preSelectedSessions && props.preSelectedSessions.includes(session.id)))
    .map(session => ({
      ...session,
      date: date(session.startDatetime).format("DD.MM.YY"),
      time: date(session.startDatetime).format(equalTimeFormat),
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

  const changeTabHandler = (durationType: DurationType) => {
    changeActiveTab(durationType)
    changeCurrentDate(null)
  }

  const WidthAmountConditionWrapper = showWithConditionWrapper(!!amount)
  const WidthCurrentDateConditionWrapper = showWithConditionWrapper(!!currentDate)

  const payForTheSessionHandler = () => {
    activeTab === "PROMO" ? bulkSession({session: selected[0].id, type: "BOOK"}) : _toggleCreditCardModal(true)
    if (activeTab === "PROMO") {
      const sessionInfo = selected[0]
      sessionInfo.coach = props.coach
      changeFreeSessionModalInfo(sessionInfo)
    }
    changeCurrentDate(null)
  }

  return (
    <Container>
      {activeTab === "PROMO" ? null : <StyledTabs value={activeTab} onChange={changeTabHandler}>
        {tabs.map(tab => (
          <StyledTab key={tab.key} value={tab.key} onlyOneCard={tabs.length === 1}>
            <TabTime>{tab.timeInMinutes} мин</TabTime>
            <TabPrice>
              <Delemiter> / </Delemiter>
              {tab.price} ₽
            </TabPrice>
          </StyledTab>
        ))}
      </StyledTabs>}

      <Block onlyOneCard={tabs.length === 1}>
        {activeTab === "PROMO" ? <CalendarSubTitle>Бесплатные сессии</CalendarSubTitle> : null}
        {loading && <Spinner />}
        <CalendarDirectionBlock>
          
          <Datepicker>
            {activeTab === "PROMO" ?  <Description>Выберите день</Description> : null}
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
              <>

                {activeTab === "PROMO" ?  <Description>Выберите время</Description> : null}
                <StyledDateHeader>{formattedDate}</StyledDateHeader>

                <Times>
                  {times.map(session => (
                    <Tag active={session.selected} key={session.id} onClick={() => toggleSession(session)}>
                      {session.start_datetime}
                    </Tag>
                  ))}
                </Times>

              </>
            </WidthCurrentDateConditionWrapper>
            <WidthAmountConditionWrapper>
              <SelectedSessions>
                {selected.map(session => (
                  <SelectedSession key={session.id}>
                    <SessionDate>{session.date}</SessionDate>
                    <SessionTime>{session.time}</SessionTime>
                    <SessionPrice>
                      {session.clientPrice}
                      <RubleIcon />
                    </SessionPrice>
                    <DeleteIcon onClick={() => deleteSession(session.id)} />
                  </SelectedSession>
                ))}
              </SelectedSessions>
              <Amount>
                <AmountText>Итого:</AmountText>
                <Summary>
                  {amount} <SummaryRuble />
                </Summary>
              </Amount>
            </WidthAmountConditionWrapper>
            <ButtonContainer>
              <IsAuthed>
                <StyledBuyButton
                  disabled={buyLoading || selected.length === 0}
                  onClick={payForTheSessionHandler}
                >
                  {activeTab === "PROMO" ? "Забронировать бесплатно" : "Забронировать"}
                </StyledBuyButton>
              </IsAuthed>

              <IsGuest>
                <StyledRegisterButton
                  disabled={selected.length === 0}
                  onClick={() => navigate({
                    url: "/auth/signup/1",
                    state: {
                      coachToRedirectAfterSignUp: {
                        coach: props.coach.id,
                        sessions: selected
                      }
                    }
                  })}
                >
                  Зарегистрироваться
                </StyledRegisterButton>
              </IsGuest>
            </ButtonContainer>
            {/*<DesktopFooter />*/}
          </SelectTimeContainer>
        </CalendarDirectionBlock>
        
      </Block>
      
    </Container>
  )
}