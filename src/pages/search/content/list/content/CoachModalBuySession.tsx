import React, { useMemo, useState } from "react"
import { useStore } from "effector-react"
import {
  $currentDenyCompletationProblem,
  $denyCompletationDialogVisibility,
  $denyCompletationProblem,
  $denyDialogRequestUser,
  $validDenyCompletationForm,
  changeCurrentDenyCompletationProblem,
  changeDenyCompletationProblem,
  denyCompletationProblems,
  hideDenyCompletetionDialogVisibility,
  sendDenyCompletationDialog,
} from "@/pages/client/session/content/session-page-content/deny-completetion-dialog/deny-completation-dialog"
import { $creditCardsModal, showCreditCardsModal } from "@/pages/search/coach-by-id/coach-by-id.model"
import { Dialog } from "@/components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { genSessionTabs, SelectDatetimeTypes } from "@/components/coach-card/select-date/SelectDatetime"
import { date } from "@/lib/formatting/date"
import { Icon } from "@/components/icon/Icon"
import { Button } from "@/components/button/normal/Button"
import { SelectInputCard } from "@/components/select-input/SelectInputCard"
import {
  $cardsListForView,
  changeCurrentCard,
  $currentCard,
  $primaryCard,
} from "@/pages/client/wallet/cards/cards.model"


const equalDateFormat = "DDMMYYYY"
const equalTimeFormat = "HH:mm"

export const SelectCreditCardDialog = (props: SelectDatetimeTypes) => {
  const visibility = useStore($creditCardsModal)
  const hide = useEvent(showCreditCardsModal)
  const cards = useStore($cardsListForView)
  const currentCard = useStore($currentCard)
  const changeCard = useEvent(changeCurrentCard)
  const primaryCard = useStore($primaryCard)

  const user = useStore($denyDialogRequestUser)
  const send = useEvent(sendDenyCompletationDialog)

  const problem = useStore($denyCompletationProblem)
  const changeProblem = useEvent(changeDenyCompletationProblem)

  const problemType = useStore($currentDenyCompletationProblem)
  const changeProblemType = useEvent(changeCurrentDenyCompletationProblem)

  const valid = useStore($validDenyCompletationForm)

  const cardsListForView = useStore($cardsListForView)

  const sessions = useStore(props.sessionsData.sessionsList)
  const loading = useStore(props.sessionsData.loading)
  const buyLoading = useStore(props.sessionsData.buySessionsLoading)
  const activeTab = useStore(props.sessionsData.tabs.$durationTab)
  const changeActiveTab = useEvent(props.sessionsData.tabs.changeDurationTab)
  const deleteSession = useEvent(props.sessionsData.deleteSession)
  const toggleSession = useEvent(props.sessionsData.toggleSession)
  const buySessionBulk = useEvent(props.sessionsData.buySessionBulk)
  const tabs = useMemo(() => genSessionTabs(props.coach), [props.coach])

  const [currentDate, changeCurrentDate] = useState<Date | null>()
  const enabledDates = sessions.map(session => session.startDatetime)

  const headerDate = currentDate ? currentDate : new Date()
  const formattedDate = date(headerDate).format("DD MMMM")
  const currentDateEqual = date(currentDate as Date).format(equalDateFormat)

  if (!props.coach.prices[activeTab] && tabs.length) {
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
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: date(session.startDatetime).format("DD.MM.YY"),
      time: date(session.startDatetime).format(equalTimeFormat),
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

  return (
    <StyledDialog value={visibility} onChange={() => hide()}>
      <Container>
        <Header>Бронирование сессий</Header>
        <Description>Деньги на карте будут заморожены за 24 часа и списаны после сессии</Description>

        <Label>Выберите карту</Label>
        <StyledSelectInput
          placeholder='Выберите карту'
          value={currentCard!.id}
          onChange={value => changeCard(value)}
          options={cards}
        />

        <Description>*Эта карта будет привязана к сервису</Description>

        <SummaryContainer>
          <Summary>
            {amount}
          </Summary>
          <RubleIcon />
        </SummaryContainer>

        <Actions>
          <StyledButton
            onClick={() => {
              hide()
            }}
          >
                  Забронировать
          </StyledButton>
        </Actions>
      </Container>
    </StyledDialog>
  )
}

const StyledSelectInput = styled(SelectInputCard)`
  width: 100%;
  max-width: 368px;
  margin-top: 2px;
  margin-bottom: 20px;
`

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 400px;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #4858CC;
  text-align: flex-start;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  text-align: flex-start;
  margin-top: 8px;
`

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`

const Summary = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 26px;
  color: #4858CC;
  text-align: center;
`

const RubleIcon = styled(Icon).attrs({ name: "ruble" })`
  width: 28px;
  height: 28px;
  fill: #4858cc;
`

const Label = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #424242;
  margin-top: 24px;
  margin-bottom: 2px;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 150px;
`