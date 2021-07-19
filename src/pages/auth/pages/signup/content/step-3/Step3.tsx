import { Avatar, AvatarPlaceholder } from "@/oldcomponents/avatar/Avatar"
import { FormItem } from "@/oldcomponents/form-item/FormItem"
import { Input } from "@/oldcomponents/input/Input"
import { AuthLayout } from "@/oldcomponents/layouts/sections/auth/AuthLayout"
import { MediaRange } from "@/lib/responsive/media"
import { NextButton } from "@/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/pages/auth/pages/signup/components/Steps"
import { BirthdayFormGroup } from "@/pages/auth/pages/signup/content/step-3/BirthdayFormGroup"
import {
  $isStep3FormValid,
  $isUploadModelOpen,
  $step3Form,
  $step3FormErrors,
  emailChanged,
  phoneChanged,
  lastNameChanged,
  middleNameChanged,
  nameChanged,
  step3FormSubmitted,
  step3Mounted,
  toggleUploadModal
} from "@/pages/auth/pages/signup/content/step-3/step3.model"
import { UploadModal } from "@/pages/auth/pages/signup/content/step-3/UploadModal"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { $isSocialSignupInProgress } from "@/feature/user/user.model"
import { $userData } from "@/pages/auth/pages/signup/models/units"
import { ymLog } from "@/lib/external-services/yandex-metrika/lib"

const StyledSteps = styled(Steps)`
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
    border-radius: 2px;
    background: #FFFFFF;
  `}

  ${MediaRange.greaterThan("laptop")`
    margin: 20px 170px;
    padding: 36px 100px 31px;
  `}
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-weight: bold;
  font-size: 24px;
  line-height: 26px;
  color: #fff;

  text-align: center;

  ${MediaRange.greaterThan("mobile")`
    font-size: 32px;
    line-height: 26px;
    color: #424242;
  `}
`

const UserAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  cursor: pointer;

    ${MediaRange.lessThan("mobile")`
    
    ${AvatarPlaceholder} {
        fill: #FFFFFF;
    }
  `}
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: #fff;
  ${NextButton} {
    margin-left: auto;
  }

  ${MediaRange.greaterThan("mobile")`
    color: #424242;
  `}
`

const AvatarWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  ${FormItem} {
    margin-bottom: 0;
    width: auto;
  }

  ${MediaRange.greaterThan("mobile")`
    margin-top: 36px;
  `}
`

const AvatarHint = styled.div`
  margin-left: 30px;
  display: none;
  flex-direction: column;
  color: #424242;
  width: 360px;

  h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #424242;
  }

  p {
    margin-top: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #9aa0a6;
  }

  ${MediaRange.greaterThan("mobile")`
    display: flex;
  `}
`

export const Step3 = () => {
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)
  const isFormValid = useStore($isStep3FormValid)
  const userType = useStore($userData).type
  const isUploadModalShowed = useStore($isUploadModelOpen)
  const isSocialSignupInProgress = useStore($isSocialSignupInProgress)

  const mounted = useEvent(step3Mounted)
  const _toggleUploadModal = useEvent(toggleUploadModal)
  const _nameChanged = useEvent(nameChanged)
  const _lastNameChanged = useEvent(lastNameChanged)
  const _emailChanged = useEvent(emailChanged)
  const _phoneChanged = useEvent(phoneChanged)
  const _step3FormSubmitted = useEvent(step3FormSubmitted)
  const _middleNameChanged = useEvent(middleNameChanged)
  const [nextDisabled, setNextDisabled] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const nextOnClick = () => {
    ymLog("reachGoal","profilesignin")
    _step3FormSubmitted()
  }

  useEffect(() => {
    mounted()
  }, [])

  return (
    <AuthLayout>
      <Steps activeId='1'>
        <Steps.Step id='1'>Роль</Steps.Step>
        <Steps.Step id='2'>Данные</Steps.Step>
        <Steps.Step id='3'>Анкета</Steps.Step>
      </Steps>
      <Container>
        <Title>Добавьте информацию о себе</Title>
        <Form onSubmit={handleSubmit}>
          <AvatarWrapper>
            <FormItem
              label={<UserAvatar src={values.image.file} onClick={() => _toggleUploadModal()}  />}
              required={userType === "coach"}
            />
            <AvatarHint>
              <h4>Добавить фото</h4>
              <p>Формат: jpg, png. Максимальный размер файла: 100Mb. Рекомендованный размер: 200х200 px.</p>
            </AvatarHint>
          </AvatarWrapper>
          <FormItem label='Имя' error={errors.name} required>
            <Input value={values.name} onChange={_nameChanged} />
          </FormItem>
          <FormItem label='Фамилия' error={errors.lastName} required>
            <Input value={values.lastName} onChange={_lastNameChanged} />
          </FormItem>
          <FormItem label='Отчество' error={errors.middleName} required={userType === "coach"}>
            <Input value={values.middleName} onChange={_middleNameChanged} />
          </FormItem>
          {isSocialSignupInProgress && (
            <FormItem label='Почта' error={errors.email} required>
              <Input value={values.email} onChange={_emailChanged} />
            </FormItem>
          )}

          <FormItem label='Телефон' error={errors.phone} required={userType === "coach"}>
            <Input
              mask='+7 (111) 111-11-11'
              placeholder='+7 (900) 000-00-00'
              value={values.phone}
              onChange={_phoneChanged}
              type='tel'
            />
          </FormItem>

          <BirthdayFormGroup setNextDisabled={setNextDisabled} />

          <NextButton onClick={nextOnClick} disabled={!isFormValid || nextDisabled} />
        </Form>
      </Container>
      {isUploadModalShowed && <UploadModal onClose={() => _toggleUploadModal()} />}
    </AuthLayout>
  )
}
