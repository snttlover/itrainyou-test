import Link from "next/link"
import { useState } from "react"
import * as React from "react"
import styled, { css } from "styled-components"
import dayjs from "dayjs"
import { Calendar } from "@/application/components/calendar/Calendar"
import { useEvent, useStore } from "effector-react"
import {Tabs, Tab} from "@/application/components/tabs/Tabs"
import { Spinner } from "@/application/components/spinner/Spinner"
import { Button } from "@/application/components/button/normal/Button"
import { SelectDatetimeTypes } from "@/application/components/coach-card/select-date/SelectDatetime"
import { Icon } from "@/application/components/icon/Icon"

type StyledTabTypes = {
  onlyOneCard: boolean
}

const Container = styled.div`
  width: 268px;
  margin-bottom: 20px;
  position: relative;
`

const Block = styled.div<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 8px;
`

const Datepicker = styled.div`
  border-bottom: 1px solid #DBDEE0;
  padding-bottom: 4px;
`

const SelectTimeContainer = styled.div`
`

const Times = styled.div`
  display: flex;
  margin-top: 12px;
  padding-left: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #DBDEE0;
`

const Tag = styled.div<{ active?: boolean }>`
  cursor: pointer;
  width: 46px;
  margin-right: 8px;
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  background: ${({active}) => active ? `#4858CC` : `#fff`};
  color: ${({active}) => active ? `#fff` : `#5B6670`};
  box-sizing: border-box;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  &:hover {
    background: #DBDEE0;
    color: #fff;
  }
`

const Divider = styled.div`
  background: #efefef;
  height: 1px;
  margin-top: 8px;
  margin-bottom: 20px;
`

const SelectedDatetimeTable = styled.table`
  font-size: 12px;
  line-height: 16px;
  width: 100px;
  & tr td:first-child {
    padding-right: 24px;
  }
`

const Text = styled.div`
  margin-top: 32px;
  font-size: 12px;
  line-height: 16px;
`
const DeleteIcon = styled(Icon).attrs({ name: `delete` })`
  fill: #4858CC;
  width: 15px;
  height: 15px;
  cursor: pointer;
`

const RubleIcon = styled(Icon).attrs({ name: `ruble` })`
  width: 15px;
  height: 15px;
  fill: #4858CC;
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
  color: #4858CC;
  display: flex;
  align-items: center;
`

const ButtonContainer = styled.div`
  padding-top: 10px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`

const StyledTabs = styled(Tabs)`
  margin-top: 4px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 480px) {
    display: none;
  }
`

const StyledDateHeader = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  margin-left: 12px;
  margin-top: 16px;
`

const OnlyOneTabStyles = css`
  justify-content: flex-end;
  padding-top: 16px;
  padding-bottom: 8px;
`
// ${props => props.onlyOneCard && OnlyOneTabStyles}
const StyledTab = styled(Tab)<StyledTabTypes>`
  display: flex;
  flex-direction: column;
  padding: 8px 13px;
`

const TabTime = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5B6670;
`

const TabPrice = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #9AA0A6;
`

const SelectedSessions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 27px;
  padding-bottom: 16px;
`

const SelectedSession = styled.div`
  display: flex;
  margin-top: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid #EFEFEF;
  width: 216px;
  align-items: center;
  &:first-child {
    margin-top: 0;
  }
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
  text-align: right;
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

const StyledButton = styled(Button)`
  padding: 4px 24px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  margin: 0 auto;
`

const AmountText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
`

const TimeColumn = styled.td`
  color: #9AA0A6;
`

const SessionPackagesStatWrapper = styled.div`
  margin-top: 24px;
  margin-top: 1px solid #DBDEE0;
  padding-top: 20px;
  width: 216px;
  margin: 0 auto;
`

const SessionPackagePercent = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: #424242;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`

const SessionPackage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SessionPackageText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
`

const SessionPackagesDescription = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #5B6670;
  margin-top: 16px;
`

const SessionsPackagesTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-bottom: 7px;
`

const equalDateFormat = `DDMMYYYY`
const equalTimeFormat = `HH:mm`

export const CoachDatepicker = (props: SelectDatetimeTypes) => {
  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)
  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)
  const deleteSession = useEvent(props.sessionsData.deleteSession)
  const [tabs, _] = useState(props.sessionsData.tabs.list)

  const [currentDate, changeCurrentDate] = useState<Date>(new Date())
  const pinnedDates = sessions.map(session => session.startDatetime)

  const formattedDate = dayjs(currentDate).format("DD MMMM")
  const currentDateEqual = dayjs(currentDate).format(equalDateFormat)
  const times = sessions
    .filter(session => {
      return dayjs(session.startDatetime).format(equalDateFormat) === currentDateEqual
    })
    .map(session => ({
      ...session,
      start_datetime: dayjs(session.startDatetime).format(equalTimeFormat)
    }))

  const selected = sessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: dayjs(session.startDatetime).format(`DD.MM.YY`),
      time: dayjs(session.startDatetime).format(equalTimeFormat)
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

  return (
    <Container>
      <StyledTabs value={activeTab} onChange={changeActiveTab}>
        {tabs.map(tab => (
          <StyledTab key={tab.key} value={tab.key} onlyOneCard={tabs.length === 1}>
            <TabTime>{tab.timeInMinutes} мин</TabTime>
            <TabPrice>{tab.price} ₽</TabPrice>
          </StyledTab>
        ))}
      </StyledTabs>
      <Block onlyOneCard={tabs.length === 1}>
        { loading && <Spinner /> }
        <Datepicker>
          <Calendar value={currentDate} pinnedDates={pinnedDates} onChange={changeCurrentDate} isBig={true} />
        </Datepicker>
        <SelectTimeContainer>
          <StyledDateHeader>{formattedDate}</StyledDateHeader>
          <Times>
            {times.map(session => (
              <Tag active={session.selected} key={session.id} onClick={() => props.sessionsData.toggleSession(session)}>
                {session.start_datetime}
              </Tag>
            ))}
          </Times>
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
            <Summary>{amount} <SummaryRuble /></Summary>
          </Amount>
          <ButtonContainer>
            <Link href='/signup/[step]' as='/signup/1'>
              <StyledButton>Зарегистрироваться</StyledButton>
            </Link>
          </ButtonContainer>
          <SessionPackagesStatWrapper>
            <SessionsPackagesTitle>
              Пакеты сессий
            </SessionsPackagesTitle>
            <SessionPackage>
              <SessionPackageText>
                2 сессии
              </SessionPackageText>
              <SessionPackagePercent>
                15%
              </SessionPackagePercent>
            </SessionPackage>
            <SessionPackagesDescription>
              Просто выберите сессии и акция автоматически активизируется
            </SessionPackagesDescription>
          </SessionPackagesStatWrapper>
        </SelectTimeContainer>
      </Block>
    </Container>
  )
}
