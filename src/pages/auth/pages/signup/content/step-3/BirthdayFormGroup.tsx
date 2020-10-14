import { FormItem, Label } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { SelectInput } from "@/components/select-input/SelectInput"
import { date } from "@/lib/formatting/date"
import { MediaRange } from "@/lib/responsive/media"
import { FormGroup } from "@/pages/auth/pages/signup/content/step-3/FormGroup"
import {
  $step3Form,
  $step3FormErrors,
  birthdayChanged,
  sexChanged,
} from "@/pages/auth/pages/signup/content/step-3/step3.model"
import { $userData } from "@/pages/auth/pages/signup/signup.model"
import dayjs from "dayjs"
import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"

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

export const BirthdayFormGroup = () => {
  const userType = useStore($userData).type
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)

  const _birthdayChanged = useEvent(birthdayChanged)
  const _sexChanged = useEvent(sexChanged)

  const [day, setDay] = useState("")
  const [month, setMonth] = useState(-1)
  const [year, setYear] = useState("")

  useEffect(() => {
    const dateStr = `${year.padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`
    const date = dayjs(
      `${year.padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`,
      "YYYY-MM-DD",
      true
    )

    if (date.format("YYYY-MM-DD") === dateStr && !date.isAfter(dayjs(), "day")) {
      _birthdayChanged(date)
    } else _birthdayChanged(null)
  }, [day, month, year])

  return (
    <React.Fragment>
      <FormGroup>
        <StyledFormItem label='Дата рождения' required={userType === "coach"}>
          <Input placeholder='День' value={day} onChange={setDay} />
        </StyledFormItem>
        <StyledFormItem label=''>
          <SelectInput placeholder='Месяц' value={month} onChange={setMonth} options={months} />
        </StyledFormItem>
        <StyledFormItem label=''>
          <Input placeholder='Год' value={year} onChange={setYear} />
        </StyledFormItem>
      </FormGroup>
      <FormGroup>
        <StyledFormItem label='Пол' error={errors.sex} required={userType === "coach"}>
          <SelectInput value={values.sex} onChange={_sexChanged} options={sexItems} />
        </StyledFormItem>
      </FormGroup>
    </React.Fragment>
  )
}
