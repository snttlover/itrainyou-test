import { FormItem } from "@app/components/form-item/FormItem"
import { Input } from "@app/components/input/Input"
import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { SelectInput } from "@app/components/select-input/SelectInput"
import { NextButton } from "@app/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import { useEffect, useState } from "react"
import * as React from "react"
import styled from "styled-components"
import * as dayjs from "dayjs"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${NextButton} {
    margin-bottom: 36px;
  }
`
const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin: 0 -8px;

  text-align: center;

  color: #424242;
`

const Description = styled.p`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 24px;

  color: #544274;
`

const UploadImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #333;
  margin-bottom: 16px;
`

const FormGroup = styled.div``

const sexItems = [
  {
    label: "Мужской",
    value: "male"
  },
  {
    label: "Женский",
    value: "female"
  }
]

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
  "Декабрь"
].map((label, index) => ({ label, value: index }))

const currentYear = dayjs().year()
const years = Array.from({ length: 100 }, (v, k) => currentYear - k).map(year => ({ label: `${year}`, value: year }))

export const Step3 = () => {
  const [birthday, setBirthday] = useState(dayjs())
  const [days, setDays] = useState<{label: string, value: number}[]>([])

  useEffect(() => {
    const date2 = birthday.add(1, "month")
    const daysCount = date2.diff(birthday, "day")
    setDays(Array.from({ length: daysCount }, (v, k) => k + 1).map(day => ({ label: `${day}`, value: day })))
  }, [])

  const changeYear = (year: number) => {
    setBirthday(birthday.set('year', year))
  }
  const changeDay = (day: number) => {
    setBirthday(birthday.set('date', day))
  }
  const changeMonth = (month: number) => {
    const newDate = birthday.set('month', month)
    const date2 = newDate.add(1, "month")
    const days = date2.diff(newDate, "day")
    setBirthday(newDate)
    setDays(Array.from({ length: days }, (v, k) => k + 1).map(day => ({ label: `${day}`, value: day })))
    if (birthday.day() > days) {
      // Если переключили на февраль, а день больше чем максимальный в феврале
      // февраль 28 дней, а выбран сейчас 31, то переключится на 28
      changeDay(days)
    }
  }


  return (
    <AuthLayout>
      <Steps activeId='3'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
      <Container>
        <Title>Добавьте информацию о себе</Title>
        <Description>Коучу надо заполнить все поля</Description>
        <UploadImage />
        <FormItem label='Имя'>
          <Input value='asdasd' />
        </FormItem>
        <FormItem label='Фамилия'>
          <Input value='asdasd' />
        </FormItem>
        <FormGroup>
          <FormItem label='Дата рождения'>
            <SelectInput placeholder='Год' value={birthday.year()} onChange={changeYear} options={years} />
          </FormItem>
          <FormItem label=''>
            <SelectInput placeholder='Месяц' value={birthday.month()} onChange={changeMonth} options={months} />
          </FormItem>
          <FormItem label=''>
            <SelectInput placeholder='День' value={birthday.date()} onChange={changeDay} options={days} />
          </FormItem>
        </FormGroup>
        <FormItem label='Пол'>
          <SelectInput placeholder='Мужской' value='m' onChange={console.log} options={sexItems} />
        </FormItem>
        <NextButton />
      </Container>
    </AuthLayout>
  )
}
