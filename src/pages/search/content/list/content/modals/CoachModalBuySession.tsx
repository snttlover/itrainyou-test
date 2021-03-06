import React, { useEffect, useMemo, useState } from "react"
import { useStore } from "effector-react"
import { Dialog } from "@/old-components/dialog/Dialog"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { SelectDatetimeTypes } from "@/old-components/coach-card/select-date/SelectDatetime"
import { date } from "@/lib/formatting/date"
import { Icon } from "@/old-components/icon/Icon"
import { Button } from "@/old-components/button/normal/Button"
import { SelectInputCard } from "@/old-components/select-input/SelectInputCard"
import { $clientCardsListForView } from "@/pages/client/wallet/cards/cards.model"
import { MediaRange } from "@/lib/responsive/media"
import { $creditCardsModalVisibility, toggleCreditCardsModal } from "@/pages/search/coach-by-id/models/units"
import { addCard } from "@/feature/client-funds-up/dialog/models/units"

type SetValue = {
    id: number | string
    type: string | null
    cardEnd: string | null
    expireDate: string | null
    isPrimary: boolean | null
}

const equalTimeFormat = "HH:mm"

export const SelectCreditCardDialog = (props: SelectDatetimeTypes) => {
  const visibility = useStore($creditCardsModalVisibility)
  const _toggleCreditCardsModal = useEvent(toggleCreditCardsModal)
  const cards = useStore($clientCardsListForView)

  const [options, setOptions] = useState<SetValue[]>([{
    id: "other",
    type: null,
    cardEnd: null,
    expireDate: null,
    isPrimary: null
  }])
  const [value, setValue] = useState<SetValue>({
    id: "other",
    type: null,
    cardEnd: null,
    expireDate: null,
    isPrimary: null
  })
  const _addCard = useEvent(addCard)

  const allSessions = useStore(props.sessionsData.sessionsList)
  const buyLoading = useStore(props.sessionsData.buySessionsLoading)
  const buySessionBulk = useEvent(props.sessionsData.buySessionBulk)


  const selected = allSessions
    .filter(session => session.selected)
    .map(session => ({
      ...session,
      date: date(session.startDatetime).format("DD.MM.YY"),
      time: date(session.startDatetime).format(equalTimeFormat),
    }))

  const amount = selected.reduce((acc, cur) => acc + parseInt(cur.clientPrice), 0)

  useEffect(() => {
    const primaryCard = cards.find(card => card.isPrimary) || {
      id: "other",
      type: null,
      cardEnd: null,
      expireDate: null,
      isPrimary: null,
    }
    setOptions([...options,...cards])
    setValue(primaryCard)
  },[cards])

  const handleBulk = () => {
    const sessions = selected.map(item => item.id)
    const card = value.id
    if (card !== "other") {
      // @ts-ignore
      buySessionBulk({ sessions, card })
    }
    else {
      localStorage.setItem("sessions", JSON.stringify(sessions))
      _addCard(props.coach.id)
    }
  }

  return (
    <StyledDialog value={visibility} onChange={() => _toggleCreditCardsModal(false)}>
      <Container>
        <Header>???????????????????????? ????????????</Header>
        <Description>???????????? ?????????? ?????????????? ?????????????????????????? ???? 24 ???????? ???? ????????????.</Description>

        <Label>???????????????? ??????????</Label>
        <StyledSelectInput
          placeholder='???????????????? ??????????'
          value={value}
          onChange={value => setValue(value)}
          options={options}
        />

        {value.id === "other" && (
          <>
            <Description>
              ???? ???????????? ???????????????????????????? ???? ???????????????? ???????????????????? ???????????????????? ?????? ???????????????????? ?? ???????????????? ?????????? (?????????? ???????????? ?? ?????????????????? 1 ??????????).
            </Description>
            <Description>?????????? ???????????????? ?????????? ?????????? ?????????????????????????? ?????????? ???????????? ???? ????????????????????????.</Description>
          </>)}

        <SummaryContainer>
          <Summary>
            {amount}
          </Summary>
          <RubleIcon />
        </SummaryContainer>

        <Actions>
          <StyledButton
            disabled={buyLoading || selected.length === 0}
            onClick={handleBulk}
          >
                  ??????????????????????????
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
  
  ${MediaRange.lessThan("mobile")`
    max-width: 320px;
  `}
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #4858CC;
  text-align: left;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #9AA0A6;
  text-align: left;
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