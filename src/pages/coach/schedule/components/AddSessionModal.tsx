import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { useClickOutside } from "@/oldcomponents/click-outside/use-click-outside"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Modal } from "@/oldcomponents/modal/Modal"
import { useDropDown } from "@/newcomponents/dropdown/DropDownItem"
import { useSelectInput } from "@/oldcomponents/select-input/SelectInput"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { DurationType } from "@/lib/api/coach-sessions"
import { MediaRange } from "@/lib/responsive/media"
import {
  $durationOptions,
  $form,
  $isCreateButtonDisabled,
  $startDatetimeOptions,
  addSessions,
  createSessionsFx,
  durationChanged,
  startDatetimeChanged,
  $sessionDate,
  $startDatetime,
  addNewTimesToDialog,
  deleteTimeFromDialog
} from "@/pages/coach/schedule/models/add-session.model"
import {
  $freeWeekdayTimes,
  $weekdaySlotsForView,
  addSlot,
  removeSlot,
} from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useStore, useEvent } from "effector-react"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"


const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Background = styled.div`
  position: fixed;
  background: rgba(42, 42, 42, 0.6);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
`

const Block = styled.div`
  max-width: 480px;
  background: #ffffff;
  border-radius: 2px;
  position: relative;
  padding: 40px 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${MediaRange.greaterThan("mobile")`
    max-width: 280px;
  `}
`

const Date = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  align-self: flex-start;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

type AddSessionModalProps = {
  showAddSessionModal: boolean
  onCrossClick: (payload: boolean | void) => boolean | void
}


const StyledDashedButton = styled(DashedButton)`
  margin-top: 16px;

  ${MediaRange.greaterThan("mobile")`
    height: 26px;
    padding-top: 0;
    padding-bottom: 0;
  `}
`

const AddIcon = styled(Icon).attrs({ name: "cross" })`
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
`

const DeleteIcon = styled(Icon).attrs({ name: "delete" })`
  fill: #9AA0A6;
  width: 50px;
  height: 50px;
  cursor: pointer;
`

export const AddSessionModal: React.FC<AddSessionModalProps> = ({ showAddSessionModal, onCrossClick }) => {
  const { SelectInput: StartSelectInput } = useDropDown()
  const { SelectInput: TypeSelectInput } = useDropDown()

  const StyledStartSelectInput = styled(StartSelectInput)`
    margin-top: 20px;
  `

  const StyledTypeSelectInput = styled(TypeSelectInput)`
    margin-top: 20px;
  `

  const formData = useStore($form)
  const durationOptions = useStore($durationOptions)
  const startDatetimeOptions = useStore($startDatetimeOptions)
  const isLoading = useStore(createSessionsFx.pending)
  const isCreateButtonDisabled = useStore($isCreateButtonDisabled)
  const newSessionsStore = useStore($startDatetime)

  const _startDatetimeChanged = useEvent(startDatetimeChanged)
  const _durationChanged = useEvent(durationChanged)
  const _onAdd = useEvent(addNewTimesToDialog)
  const _onDelete = useEvent(deleteTimeFromDialog)

  const _addTodaySession = useEvent(addSessions)
  const _addWeekDaySlot = useEvent(addSlot)

  const date = useStore($sessionDate)

  //formData.startDatetime formData.durationType
  return (
    <StyledDialog value={showAddSessionModal} onChange={onCrossClick}>
      {isLoading ? <Spinner />
        :
        <>
          <Title>Доступное время</Title>
          <Date>{date.format("dddd [,] D MMMM")}</Date>
          {newSessionsStore.map((item,index) => (
            <RowBlock key={index}>
              <StyledStartSelectInput
                value={item.startTime}
                onChange={value => _startDatetimeChanged({startTime: value, id: item.id})}
                options={startDatetimeOptions}
                placeholder='Время'
              />
              <StyledTypeSelectInput
                value={item.duration}
                onChange={value => _durationChanged({duration: value, id: item.id})}
                options={durationOptions}
                placeholder='Тип'
              />
              <DeleteIcon onClick={() => _onDelete(item.id)}  />
            </RowBlock>
          ))}
          <RowBlock>
            <AddIcon onClick={() => _onAdd()} /> <div>Добавить еще время</div>
          </RowBlock>
          <RowBlock>
            <StyledDashedButton disabled={isCreateButtonDisabled} onClick={() => _addWeekDaySlot()}>
        Применить для всех {date.format("dd")}
            </StyledDashedButton>
            <StyledDashedButton disabled={isCreateButtonDisabled} onClick={() => _addTodaySession()}>
        Применить для {date.format("D MMMM")}
            </StyledDashedButton>
          </RowBlock> 
        </>      
      }
    </StyledDialog>
  )
}
