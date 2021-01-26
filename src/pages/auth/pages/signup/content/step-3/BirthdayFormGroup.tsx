import { FormItem, Label } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { useSelectInput } from "@/components/select-input/SelectInput"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { FormGroup } from "@/pages/auth/pages/signup/content/step-3/FormGroup"
import {
  $step3Form,
  $step3FormErrors,
  birthdayChanged,
  sexChanged,
} from "@/pages/auth/pages/signup/content/step-3/step3.model"
import dayjs from "dayjs"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { $userData } from "@/pages/auth/pages/signup/models/units"

const StyledFormItem = styled(FormItem)`
  color: #424242;

  ${Label} {
    color: #fff;
  }

  ${MediaRange.greaterThan("mobile")`
    ${Label} {
      color: #424242;
    }
  `}
`

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
].map((label, index) => ({ label, value: index + 1 }))

const sexItems: { label: string; value: "M" | "F" }[] = [
  {
    label: "Мужской",
    value: "M",
  },
  {
    label: "Женский",
    value: "F",
  },
]

export const BirthdayFormGroup = ({ setNextDisabled }: { setNextDisabled: (value: boolean) => void }) => {

  const {SelectInput: MonthSelectInput, openSelect: openMonthSelect} = useSelectInput()
  const {SelectInput: SexSelectInput, openSelect: openSexSelect} = useSelectInput()

  const userType = useStore($userData).type
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)

  const _birthdayChanged = useEvent(birthdayChanged)
  const _sexChanged = useEvent(sexChanged)

  const [day, setDay] = useState("")
  const [month, setMonth] = useState(-1)
  const [year, setYear] = useState("")
  const [birthdayError, setBirthdayError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (!isDirty) return
    const dateStr = `${year.padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`
    const date = dayjs(
      `${year.padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`,
      "YYYY-MM-DD",
      true
    )
    if (date.format("YYYY-MM-DD") === dateStr && !date.isAfter(dayjs(), "day")) {
      _birthdayChanged(date)
      setBirthdayError(null)
      setNextDisabled(false)
    } else {
      _birthdayChanged(null)
      setBirthdayError("Неверная дата")
      setNextDisabled(true)
    }
  }, [day, month, year, isDirty])

  const goToInput = (elem: HTMLInputElement | undefined) => {
    elem && elem.focus()
  }

  const dayRef = useRef()
  const yearRef = useRef()


  return (
    <React.Fragment>
      <FormGroup>
        <StyledFormItem label='Дата рождения' required={userType === "coach"} error={birthdayError}>
          <Input
            placeholder='День'
            value={day}
            onChange={value => {
              setDay(value)
              setIsDirty(true)
              if(`${value}`.length > 1){
                openMonthSelect()
                dayRef.current.blur()
              }
            }}
            reff={dayRef}
          />
        </StyledFormItem>
        <StyledFormItem label='' error={birthdayError && ""}>
          <MonthSelectInput
            placeholder='Месяц'
            value={month}
            onChange={value => {
              setMonth(value)
              setIsDirty(true)
              goToInput(yearRef.current)
            }}
            options={months}
          />
        </StyledFormItem>
        <StyledFormItem label='' error={birthdayError && ""}>
          <Input
            placeholder='Год'
            value={year}
            onChange={value => {
              setYear(value)
              setIsDirty(true)
              if(`${value}`.length > 3){
                openSexSelect()
                yearRef.current?.blur()
              }
            }}
            reff={yearRef}
          />
        </StyledFormItem>
      </FormGroup>
      <FormGroup>
        <StyledFormItem label='Пол' error={errors.sex} required={userType === "coach"}>
          <SexSelectInput value={values.sex} onChange={_sexChanged} options={sexItems} />
        </StyledFormItem>
      </FormGroup>
    </React.Fragment>
  )
}
