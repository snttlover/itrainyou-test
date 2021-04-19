import React from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { MediaRange } from "@/lib/responsive/media"
import { RemoveSessionsDateRangePicker } from "@/pages/coach/schedule/components/RemoveSessionsDateRangePicker"
import { useEvent, useStore } from "effector-react"
import {
  $pickedDeleteRange,
  changePickedDeleteRange,
  removeSessionsRange
} from "@/pages/coach/schedule/models/sessions.model"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { Button } from "@/oldcomponents/button/normal/Button"
import { Title } from "@/pages/coach/schedule/CoachSchedulePage"


const AddVacationDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 300px;
`

const StyledDashedButton = styled(DashedButton)`
  width: 220px;
  padding: 6px 24px;
  font-size: 16px;
  ${MediaRange.lessThan("mobile")`
    width: 144px
  `}
`

const StyledSuccessButton = styled(Button)`
  width: 220px;
  margin-left: 16px;
  font-size: 16px;
  ${MediaRange.lessThan("mobile")`
    width: 144px
  `}
`

const StyledDateRangePicker = styled(RemoveSessionsDateRangePicker)`
  width: 100%;
`

type VacationDialogTypes = {
  visibility: boolean
  setVisibility: (value: boolean) => void
}

export const AddVacationModal: React.FC<VacationDialogTypes> = ({visibility, setVisibility }) => {

  const range = useStore($pickedDeleteRange)
  const setRange = useEvent(changePickedDeleteRange)

  const _removeSessionsRange = useEvent(removeSessionsRange)
  
  const handleOnClick = () => {
    setVisibility(false)
    _removeSessionsRange(range)
  }

  return(
    <AddVacationDialog value={visibility} onChange={setVisibility}>
      <Title>Выберите даты начала и окончания отпуска</Title>
      <RemoveDateRangeContainer>
        <StyledDateRangePicker range={range} rangeChanged={setRange} />
      </RemoveDateRangeContainer>
      <ButtonsContainer>
        <StyledDashedButton onClick={() => setVisibility(false)}>Нет</StyledDashedButton>
        <StyledSuccessButton onClick={handleOnClick}>Да</StyledSuccessButton>
      </ButtonsContainer>
    </AddVacationDialog>
  )
}
