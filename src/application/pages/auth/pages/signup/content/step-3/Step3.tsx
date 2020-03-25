import { FormItem } from "@app/components/form-item/FormItem"
import { Input } from "@app/components/input/Input"
import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { SelectInput } from "@app/components/select-input/SelectInput"
import { navigate } from "@app/lib/navigation"
import { MediaRange } from "@app/lib/responsive/media"
import { NextButton } from "@app/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import {
  $isStep3FormValid,
  $step3Form,
  $step3FormErrors,
  birthdayChanged,
  nameChanged,
  lastNameChanged,
  sexChanged,
  $isUploadModelOpen,
  toggleUploadModal,
  step3Mounted
} from "@app/pages/auth/pages/signup/content/step-3/step3.model"
import { UploadModal } from "@app/pages/auth/pages/signup/content/step-3/UploadModal"
import { $userData } from "@app/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import * as React from "react"
import styled from "styled-components"
import * as dayjs from "dayjs"
import uploadImage from "./upload.svg"

const StyledSteps = styled(Steps)`
  //
  ${MediaRange.greaterThan("laptop")`
    margin-right: 134px;
  `};
`

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 36px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${MediaRange.greaterThan("mobile")`
    margin: 123px 36px;
    padding: 36px 48px 31px;
    background: #FFFFFF;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.25);
  `}

  ${MediaRange.greaterThan("laptop")`
    margin: 20px 170px;
    padding: 36px 100px 31px;
  `}
`
const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  margin: 0 -8px;

  text-align: center;

  color: #424242;

  ${MediaRange.greaterThan("mobile")`
    font-size: 36px;
    line-height: 44px;
  `}
`

const Description = styled.p`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 24px;
  height: 22px;

  color: #544274;
  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const UploadImage = styled.img<{ withAvatar: boolean }>`
  width: ${({ withAvatar }) => (withAvatar ? "60px" : "67px")};
  height: 60px;
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: ${({ withAvatar }) => (withAvatar ? "30px" : "0")};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${MediaRange.greaterThan("mobile")`
    align-items: flex-end;
    flex-direction: row;
    
    ${FormItem} {
      width: 140px;
      margin-left: 12px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  `};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const sexItems: { label: string; value: "M" | "F" }[] = [
  {
    label: "Мужской",
    value: "M"
  },
  {
    label: "Женский",
    value: "F"
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

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

export const Step3 = () => {
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)
  const isFormValid = useStore($isStep3FormValid)
  const userType = useStore($userData).type
  const isUploadModalShowed = useStore($isUploadModelOpen)

  const [days, setDays] = useState<{ label: string; value: number }[]>([])

  useEffect(() => {
    const date2 = values.birthday.add(1, "month")
    const daysCount = date2.diff(values.birthday, "day")
    setDays(Array.from({ length: daysCount }, (v, k) => k + 1).map(day => ({ label: `${day}`, value: day })))
    step3Mounted()
  }, [])

  const changeYear = (year: number) => {
    birthdayChanged(values.birthday.set("year", year))
  }
  const changeDay = (day: number) => {
    birthdayChanged(values.birthday.set("date", day))
  }
  const changeMonth = (month: number) => {
    const newDate = values.birthday.set("month", month)
    const date2 = newDate.add(1, "month")
    const days = date2.diff(newDate, "day")
    birthdayChanged(newDate)
    setDays(Array.from({ length: days }, (v, k) => k + 1).map(day => ({ label: `${day}`, value: day })))
    if (values.birthday.day() > days) {
      // Если переключили на февраль, а день больше чем максимальный в феврале
      // февраль 28 дней, а выбран сейчас 31, то переключится на 28
      changeDay(days)
    }
  }

  return (
    <AuthLayout>
      <StyledSteps activeId='3'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </StyledSteps>
      <Container>
        <Title>Добавьте информацию о себе</Title>
        <Description>{userType === "couch" && "Коучу надо заполнить все поля"}</Description>
        <Form onSubmit={handleSubmit}>
          <UploadImage
            src={values.image.file || uploadImage}
            onClick={_ => toggleUploadModal()}
            withAvatar={!!values.image.file}
          />
          <FormItem label='Имя' error={errors.name} required>
            <Input value={values.name} onChange={nameChanged} />
          </FormItem>
          <FormItem label='Фамилия' error={errors.lastName} required>
            <Input value={values.lastName} onChange={lastNameChanged} />
          </FormItem>
          <FormGroup>
            <FormItem label='Дата рождения' required>
              <SelectInput placeholder='День' value={values.birthday.date()} onChange={changeDay} options={days} />
            </FormItem>
            <FormItem label=''>
              <SelectInput
                placeholder='Месяц'
                value={values.birthday.month()}
                onChange={changeMonth}
                options={months}
              />
            </FormItem>
            <FormItem label=''>
              <SelectInput placeholder='Год' value={values.birthday.year()} onChange={changeYear} options={years} />
            </FormItem>
          </FormGroup>
          <FormGroup>
            <FormItem label='Пол' error={errors.sex} required>
              <SelectInput placeholder='Мужской' value={values.sex} onChange={sexChanged} options={sexItems} />
            </FormItem>
          </FormGroup>
          <NextButton onClick={() => navigate('/signup/4')} disabled={!isFormValid} />
        </Form>
      </Container>
      {isUploadModalShowed && <UploadModal onClose={() => toggleUploadModal()} />}
    </AuthLayout>
  )
}
