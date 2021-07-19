import { FormItem, Label } from "@/old-components/form-item/FormItem"
import { Input } from "@/old-components/input/Input"
import { useSelectInput } from "@/old-components/select-input/SelectInput"
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
import { $registerUserData } from "@/pages/auth/pages/signup/models/units"

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

  const userData = useStore($registerUserData)
  const userType = userData.type
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)

  const _birthdayChanged = useEvent(birthdayChanged)
  const _sexChanged = useEvent(sexChanged)

  const [day, setDay] = useState( "")
  const [month, setMonth] = useState(-1)
  const [year, setYear] = useState("")
  const [birthdayError, setBirthdayError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    console.log("day", values.birthday ? values.birthday.date().toString() : "")
    console.log("month", values.birthday ? values.birthday.month() + 1 : -1)
    console.log("year", values.birthday ? values.birthday.year().toString() : "")

    if (values.birthday?.date())
      setDay(values.birthday.date().toString())
    if (values.birthday?.month() || values.birthday?.month() === 0)
      setMonth(values.birthday.month() + 1)
    if (values.birthday?.year())
      setYear(values.birthday.year().toString())
  }, [values.birthday])

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
    } else if(year.length > 3 && month || !+year && year || !+day && day) {
      _birthdayChanged(null)
      setBirthdayError("Неверная дата")
      setNextDisabled(true)
    }
  }, [day, month, year, isDirty])

  const goToInput = (elem: HTMLInputElement | undefined) => {
    elem && elem.focus()
  }

  const dayRef = useRef<HTMLInputElement>()
  const yearRef = useRef<HTMLInputElement>()


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
                dayRef.current?.blur()
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
