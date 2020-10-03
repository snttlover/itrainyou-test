import { FormItem } from "#/components/form-item/FormItem"
import { SelectInput } from "#/components/select-input/SelectInput"
import { date } from "#/lib/formatting/date"
import { MediaRange } from "#/lib/responsive/media"
import { FormGroup } from "./FormGroup"
import { $clientProfileForm, $clientProfileFormErrors, birthdayChanged, sexChanged } from "./client-profile.model"
import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import { useState } from "react"
import styled from "styled-components"

const StyledFormItem = styled(FormItem)`
  color: #424242;

  ${MediaRange.lessThan("mobile")`
    &:not(:first-of-type) {
      margin-top: -16px;
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
].map((label, index) => ({ label, value: index }))

const currentYear = date().year()
const years = Array.from({ length: 100 }, (v, k) => currentYear - k).map(year => ({ label: `${year}`, value: year }))

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
  let birthday = date(useStore($clientProfileForm).birthday)
  const values = useStore($clientProfileForm)
  const errors = useStore($clientProfileFormErrors)

  const _birthdayChanged = useEvent(birthdayChanged)
  const _sexChanged = useEvent(sexChanged)

  const [days, setDays] = useState<{ label: string; value: number }[]>(
    Array.from({ length: 31 }, (v, k) => k + 1).map(day => ({ label: `${day}`, value: day }))
  )

  const changeYear = (year: number) => {
    if (!birthday || !birthday.isValid()) {
      birthday = date()
    }
    _birthdayChanged(birthday.set("year", year))
  }
  const changeDay = (day: number) => {
    if (!birthday || !birthday.isValid()) {
      birthday = date()
    }
    _birthdayChanged(birthday.set("date", day))
  }

  const changeMonth = (month: number) => {
    if (!birthday || !birthday.isValid()) {
      birthday = date()
    }
    const newDate = birthday.set("month", month)
    const date2 = newDate.add(1, "month")
    const days = date2.diff(newDate, "day")
    _birthdayChanged(newDate)
    setDays(Array.from({ length: days }, (v, k) => k + 1).map(day => ({ label: `${day}`, value: day })))
    if (birthday.day() > days) {
      // Если переключили на февраль, а день больше чем максимальный в феврале
      // февраль 28 дней, а выбран сейчас 31, то переключится на 28
      changeDay(days)
    }
  }
  return (
    <>
      <FormGroup>
        <StyledFormItem label='Дата рождения' required>
          <SelectInput
            withoutBorder
            placeholder='День'
            value={birthday ? birthday.date() : -1}
            onChange={changeDay}
            options={days}
          />
        </StyledFormItem>
        <StyledFormItem label=''>
          <SelectInput
            withoutBorder
            placeholder='Месяц'
            value={birthday ? birthday.month() : -1}
            onChange={changeMonth}
            options={months}
          />
        </StyledFormItem>
        <StyledFormItem label=''>
          <SelectInput
            withoutBorder
            className='year'
            placeholder='Год'
            value={birthday ? birthday.year() : -1}
            onChange={changeYear}
            options={years}
          />
        </StyledFormItem>
      </FormGroup>
      <FormGroup>
        <StyledFormItem label='Пол' error={errors.sex} required>
          <SelectInput withoutBorder value={values.sex} onChange={_sexChanged} options={sexItems} />
        </StyledFormItem>
      </FormGroup>
    </>
  )
}
