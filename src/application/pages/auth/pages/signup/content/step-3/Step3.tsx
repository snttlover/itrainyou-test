import { FormItem } from "@/application/components/form-item/FormItem"
import { Input } from "@/application/components/input/Input"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { SelectInput } from "@/application/components/select-input/SelectInput"
import { MediaRange } from "@/application/lib/responsive/media"
import { NextButton } from "@/application/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/application/pages/auth/pages/signup/components/Steps"
import { BirthdayFormGroup } from "@/application/pages/auth/pages/signup/content/step-3/BirthdayFormGroup"
import { FormGroup } from "@/application/pages/auth/pages/signup/content/step-3/FormGroup"
import {
  $isStep3FormValid,
  $isUploadModelOpen,
  $step3Form,
  $step3FormErrors,
  lastNameChanged,
  nameChanged,
  sexChanged,
  step3Mounted,
  toggleUploadModal
} from "@/application/pages/auth/pages/signup/content/step-3/step3.model"
import { UploadModal } from "@/application/pages/auth/pages/signup/content/step-3/UploadModal"
import { $userData } from "@/application/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import Router from "next/router"
import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
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
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: ${({ withAvatar }) => (withAvatar ? "30px" : "0")};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  ${NextButton} {
    margin-left: auto
  }
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

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

export const Step3 = () => {
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)
  const isFormValid = useStore($isStep3FormValid)
  const userType = useStore($userData.map(data => data.type))
  const isUploadModalShowed = useStore($isUploadModelOpen)

  useEffect(() => {
    step3Mounted()
  }, [])

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
          <FormItem
            label={
              <UploadImage
                src={values.image.file || uploadImage}
                onClick={_ => toggleUploadModal()}
                withAvatar={!!values.image.file}
              />
            }
            required={userType === "couch"}
          />
          <FormItem label='Имя' error={errors.name} required>
            <Input value={values.name} onChange={nameChanged} />
          </FormItem>
          <FormItem label='Фамилия' error={errors.lastName} required>
            <Input value={values.lastName} onChange={lastNameChanged} />
          </FormItem>
          <BirthdayFormGroup />
          <FormGroup>
            <FormItem label='Пол' error={errors.sex} required={userType === "couch"}>
              <SelectInput placeholder='Пол' value={values.sex} onChange={sexChanged} options={sexItems} />
            </FormItem>
          </FormGroup>
          <NextButton onClick={() => Router.push("/signup/[step]", "/signup/4")} disabled={!isFormValid} />
        </Form>
      </Container>
      {isUploadModalShowed && <UploadModal onClose={() => toggleUploadModal()} />}
    </AuthLayout>
  )
}
