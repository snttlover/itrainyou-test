import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { useClickOutside } from "@/oldcomponents/click-outside/use-click-outside"
import { Icon } from "@/oldcomponents/icon/Icon"
import { Modal } from "@/oldcomponents/modal/Modal"
import { DropDown } from "@/newcomponents/dropdown/DropDownItem"
import { useSelectInput } from "@/oldcomponents/select-input/SelectInput"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { DurationType } from "@/lib/api/coach-sessions"
import { MediaRange } from "@/lib/responsive/media"
import {
  $durationOptions,
  $isCreateButtonDisabled,
  $startDatetimeOptions,
  addSessions,
  createSessionsFx,
  durationChanged,
  startDatetimeChanged,
  $sessionDate,
  $startDatetime,
  addNewTimesToDialog,
  deleteTimeFromDialog,
  $durationListTest,
  StartTimeChanged
} from "@/pages/coach/schedule/models/add-session.model"
import {
  $freeWeekdayTimes,
  $weekdaySlotsForView,
  addSlot,
  addSlotFromModal,
  removeSlot,
} from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useStore, useEvent, useStoreMap } from "effector-react"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { Informer } from "@/newcomponents/informer/Informer"
import { InputComponent } from "@/newcomponents/input/Input"
import { $pricesWithFee, changePrice, Prices } from "@/pages/coach/schedule/models/price-settings.model"


const StyledDialog = styled(Dialog)`
  max-width: 560px;
  padding: 24px 24px;
  min-height: 300px;
`

const Date = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  text-align: left;
  color: #424242;
  margin-bottom: 24px;

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
  width: 20px;
  height: 20px;
  cursor: pointer;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
`

const SelectBoxContainer = styled.div`
  width: 130px;
  margin-right: 10px;
`


const RowBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0;
`

const SetPrice: React.FC<{ durationType: DurationType }> = ({ durationType }) => {


  let name: keyof Prices = "d30Price"

  if (durationType === "D30") {
    name = "d30Price"
  }
  if (durationType === "D45") {
    name = "d45Price"
  }
  if (durationType === "D60") {
    name = "d60Price"
  }
  if (durationType === "D90") {
    name = "d90Price"
  }

  /*switch (durationType) {
  case "D30":
    name = "d30Price"
    break
  case "D45":
    name = "d45Price"
    break
  case "D60":
    name = "d60Price"
    break
  case "D90":
    name = "d90Price"
    break
  default:
    name = "d30Price"
    break
  }*/

  const price = useStoreMap({
    store: $pricesWithFee,
    keys: [name],
    fn: (prices, [name]) => prices.find(price => price.name === name),
  })

  const priceUpdate = useEvent(changePrice)
  return (
    <Informer>
      <InputComponent
        placeholder='0'
        withoutBorder
        type='number'
        value={price?.value.toString() || ""}
        label={"Укажите цену сессии"}
        onChange={value => {
          priceUpdate({ name, value: parseFloat(value) })
        }}/>
      <StyledDashedButton>Подтвердить</StyledDashedButton>
    </Informer>
  )
}

export const AddSessionModal: React.FC<AddSessionModalProps> = ({ showAddSessionModal, onCrossClick }) => {
  //const { SelectInput: StartSelectInput } = useDropDown()
  //const { SelectInput: TypeSelectInput } = useDropDown()

  // @ts-ignore
  const durationOptionsTest: {label: string; value: string; price: number}[] = useStore($durationListTest)

  //const formData = useStore($form)
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
  const _addWeekDaySlot = useEvent(addSlotFromModal)

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
            <div key={index}>
              <RowBlock>
                <SelectBoxContainer>
                  <DropDown
                    value={item.startTime}
                    onChange={value => _startDatetimeChanged({startTime: value.value, id: item.id, duration: item.duration, price: item.price})}
                    options={startDatetimeOptions}
                    placeholder='Время'
                  />
                </SelectBoxContainer>
                <SelectBoxContainer>
                  <DropDown
                    value={item.duration}
                    onChange={value => _durationChanged({duration: value.value, id: item.id, startTime: item.startTime, price: value.price})}
                    options={durationOptionsTest}
                    placeholder='Тип'
                  />
                </SelectBoxContainer>
                {newSessionsStore.length > 1 ? <DeleteIcon onClick={() => _onDelete(item.id)} /> : null}
                {/*<StyledStartSelectInput
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
              <DeleteIcon onClick={() => _onDelete(item.id)}  />*/}
              </RowBlock>
              {durationOptionsTest.find(duration => duration.value === item.duration)?.price === 0 ?
                <SetPrice durationType={item.duration} /> : null}
            </div>
          ))}
          <RowBlock>
            <AddIcon onClick={() => _onAdd()} /> <Text>Добавить еще время</Text>
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
