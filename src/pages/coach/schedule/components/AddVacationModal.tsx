import React from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { MediaRange } from "@/lib/responsive/media"
import { RemoveSessionsDateRangePicker } from "@/pages/coach/schedule/components/RemoveSessionsDateRangePicker"
import { useEvent, useStore } from "effector-react"
import {
  $deleteButtonIsDisabled,
  $pickedDeleteRange,
  changePickedDeleteRange,
  removeSessionsRange
} from "@/pages/coach/schedule/models/sessions.model"
import { Button } from "@/oldcomponents/button/normal/Button"
import { Title } from "@/pages/coach/schedule/CoachSchedulePage"
import { showVacationModal, $isVacationModalShowed } from "@/pages/coach/schedule/models/calendar.model"


const AddVacationDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
  min-height: unset;
`

const RemoveDateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-width: 700px;

  ${MediaRange.greaterThan("mobile")`
    flex-direction: row;
    align-items: center;
  `}
`

const StyledSuccessButton = styled(Button)`
  width: 220px;
  margin-left: 16px;
  font-size: 16px;
  margin-top: 40px;
  float: right;
  ${MediaRange.lessThan("mobile")`
    width: 144px
  `}
`

const Description = styled.div`
  margin-top: 8px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #5B6670;  
`

const StyledDateRangePicker = styled(RemoveSessionsDateRangePicker)`
  width: 100%;
`


export const AddVacationModal = () => {

  const range = useStore($pickedDeleteRange)
  const visibility = useStore($isVacationModalShowed)

  const setRange = useEvent(changePickedDeleteRange)

  const _removeSessionsRange = useEvent(removeSessionsRange)
  const toggle = useEvent(showVacationModal)

  const disabledDelete = useStore($deleteButtonIsDisabled)
  
  const handleOnClick = () => {
    toggle(false)
    _removeSessionsRange(range)
  }

  return(
    <AddVacationDialog value={visibility} onChange={toggle}>
      <Title>Когда у Вас отпуск?</Title>
      <Description>Выберите промежутки, когда не хотите проводить сессии</Description>
      <RemoveDateRangeContainer>
        <StyledDateRangePicker range={range} rangeChanged={setRange} />
      </RemoveDateRangeContainer>
      <StyledSuccessButton disabled={disabledDelete} onClick={handleOnClick}>Добавить отпуск</StyledSuccessButton>
    </AddVacationDialog>
  )
}
