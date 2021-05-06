import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { Icon } from "@/oldcomponents/icon/Icon"
import { DropDown } from "@/newcomponents/dropdown/DropDownItem"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { DurationType } from "@/lib/api/coach-sessions"
import { MediaRange } from "@/lib/responsive/media"
import {
  $durationList,
  $durationOptions,
  $formSessionsData, $isCreateButtonDisabled,
  $sessionDate,
  $startTimeOptions,
  addSessions,
  addSessionToForm,
  createSessionsFx,
  deleteSessionToForm,
  formSessionDurationChanged,
  formSessionStartDatetimeChanged, getStartTimeOptions
} from "@/pages/coach/schedule/models/add-session.model"
import { addSlotFromModal, } from "@/pages/coach/schedule/models/weekday-schedule.model"
import { useEvent, useStore } from "effector-react"
import React, { useState } from "react"
import styled from "styled-components"
import { Dialog } from "@/oldcomponents/dialog/Dialog"
import { Informer } from "@/newcomponents/informer/Informer"
import { Input } from "@/newcomponents/input/Input"
import { $prices, changePrice, Prices } from "@/pages/coach/schedule/models/price-settings/units"
import { $isAddSessionModalShowed, showAddSessionModal } from "@/pages/coach/schedule/models/calendar.model"


const StyledDialog = styled(Dialog)`
  max-width: 560px;
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

const StyledDashedButton = styled(DashedButton)`
  margin-top: 16px;
  align-self: flex-end;
  justify-self: flex-end;

  ${MediaRange.greaterThan("mobile")`
    height: 26px;
    padding-top: 0;
    padding-bottom: 0;
  `}
`

const StyledPriceButton = styled(DashedButton)`
  margin-top: 16px;
  width: 175px;
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
  cursor: pointer;
`

const SelectBoxContainer = styled.div`
  width: 130px;
  margin-right: 10px;

  ${MediaRange.lessThan("mobile")`
    width: 100px;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  let title = ""

  if (durationType === "D30") {
    name = "d30Price"
    title = "Укажите цену для сессии 30 минут"
  }
  if (durationType === "D45") {
    name = "d45Price"
    title = "Укажите цену для сессии 45 минут"
  }
  if (durationType === "D60") {
    name = "d60Price"
    title = "Укажите цену для сессии 60 минут"
  }
  if (durationType === "D90") {
    name = "d90Price"
    title = "Укажите цену для сессии 90 минут"
  }


  const [priceValue, setValue] = useState("")
  const priceUpdate = useEvent(changePrice)
  return (
    <Informer>
      <Input
        placeholder='0'
        withoutBorder
        type='number'
        value={priceValue}
        label={title}
        onChange={(value: string) => {
          setValue(value)
        }}/>
      <StyledPriceButton
        disabled={!priceValue}
        onClick={() => priceUpdate({ name, value: parseFloat(priceValue)})}>
        Добавить цену</StyledPriceButton>
    </Informer>
  )
}

export const AddSessionModal = () => {
  const prices = useStore($prices)
  const durationOptions = useStore($durationOptions)
  const startTimeOptions = useStore($startTimeOptions)
  const visibility = useStore($isAddSessionModalShowed)

  const isLoading = useStore(createSessionsFx.pending)
  const isCreateButtonDisabled = useStore($isCreateButtonDisabled)
  const formSessions = useStore($formSessionsData)

  const _getStartTimeOptions = useEvent(getStartTimeOptions)
  const _startDatetimeChanged = useEvent(formSessionStartDatetimeChanged)
  const _durationChanged = useEvent(formSessionDurationChanged)
  const _onAdd = useEvent(addSessionToForm)
  const _onDelete = useEvent(deleteSessionToForm)

  const onCrossClick = useEvent(showAddSessionModal)

  const _addTodaySession = useEvent(addSessions)
  const _addWeekDaySlot = useEvent(addSlotFromModal)

  const date = useStore($sessionDate)

  return (
    <StyledDialog value={visibility} onChange={onCrossClick}>
      {isLoading ? <Spinner />
        :
        <Container>
          <Title>Доступное время</Title>
          <Date>{date.format("dddd [,] D MMMM")}</Date>

          {formSessions.map((item, index) => (
            <div key={index}>
              <RowBlock>
                <SelectBoxContainer>
                  <DropDown
                    onClick={() => _getStartTimeOptions(item.id)}
                    value={item.startTime}
                    onChange={
                      value => _startDatetimeChanged({
                        startTime: value, id: item.id, duration: item.duration
                      })
                    }
                    options={[...startTimeOptions, {label: item.startTime!, value: item.startTime!}]}
                    placeholder='Время'
                  />
                </SelectBoxContainer>
                <SelectBoxContainer>
                  <DropDown
                    value={item.duration}
                    onChange={value => _durationChanged({
                      duration: value, id: item.id, startTime: item.startTime
                    })}
                    options={durationOptions}
                    placeholder='Тип'
                  />
                </SelectBoxContainer>
                {formSessions.length > 1 ? <DeleteIcon onClick={() => _onDelete(item.id)} /> : null}

              </RowBlock>
              {!(prices.find(price => price.key === item.duration)?.value)?
                <SetPrice durationType={item.duration} /> : null}
            </div>
          ))}
          <RowBlock>
            <AddIcon onClick={() => _onAdd()} /> <Text onClick={() => _onAdd()}>Добавить еще время</Text>
          </RowBlock>
          {/*<RowBlock>
            <StyledDashedButton disabled={isCreateButtonDisabled} onClick={() => _addWeekDaySlot()}>
              Применить для всех {date.format("dd")}
            </StyledDashedButton>
          </RowBlock>*/}
          <StyledDashedButton disabled={isCreateButtonDisabled} onClick={() => _addTodaySession()}>
            Применить для {date.format("D MMMM")}
          </StyledDashedButton>
        </Container>
      }
    </StyledDialog>
  )
}
