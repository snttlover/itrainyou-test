import { Avatar } from "@/components/avatar/Avatar"
import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { AuthLayout } from "@/components/layouts/sections/auth/AuthLayout"
import { history } from "@/feature/navigation"
import { MediaRange } from "@/lib/responsive/media"
import { NextButton } from "@/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/pages/auth/pages/signup/components/Steps"
import { BirthdayFormGroup } from "@/pages/auth/pages/signup/content/step-3/BirthdayFormGroup"
import {
  $isStep3FormValid,
  $isUploadModelOpen,
  $step3Form,
  $step3FormErrors,
  lastNameChanged,
  nameChanged,
  step3Mounted,
  toggleUploadModal,
  emailChanged,
  step3Gate,
} from "@/pages/auth/pages/signup/content/step-3/step3.model"
import { UploadModal } from "@/pages/auth/pages/signup/content/step-3/UploadModal"
import { $userData } from "@/pages/auth/pages/signup/signup.model"
import { $socialNetworkName, nextonClick, createUserFromSocialsFx } from "@/pages/auth/pages/signup/content/socials/socials.model"
import { useEvent, useStore, useGate } from "effector-react"
import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"

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

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
}

export const Step3 = () => {
  const values = useStore($step3Form)
  const errors = useStore($step3FormErrors)
  const isFormValid = useStore($isStep3FormValid)
  const userType = useStore($userData).type
  const isUploadModalShowed = useStore($isUploadModelOpen)
  const social = useStore($socialNetworkName)

  const mounted = useEvent(step3Mounted)
  const _toggleUploadModal = useEvent(toggleUploadModal)
  const _nameChanged = useEvent(nameChanged)
  const _lastNameChanged = useEvent(lastNameChanged)
  const _emailChanged = useEvent(emailChanged)
  const _nextonClick = useEvent(nextonClick)
  const _createUserFromSocials = useEvent(createUserFromSocialsFx.done)
  const [nextDisabled, setNextDisabled] = useState(false)

  useGate(step3Gate)

  const _onClick = () => {
    _nextonClick()
  }
  useEffect(() => {
    mounted()
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
        <Form onSubmit={handleSubmit}>
          <AvatarWrapper>
            <FormItem
              label={<UserAvatar src={values.image.file} onClick={() => _toggleUploadModal()} />}
              required={userType === "coach"}
            />
            <AvatarHint>
              <h4>Добавить фото</h4>
              <p>Формат: jpg, png. Максимальный размер файла: 2Mb. Рекомендованный размер: 200х200 px.</p>
            </AvatarHint>
          </AvatarWrapper>
          <FormItem label='Имя' error={errors.name} required>
            <Input value={values.name} onChange={_nameChanged} />
          </FormItem>
          <FormItem label='Фамилия' error={errors.lastName} required>
            <Input value={values.lastName} onChange={_lastNameChanged} />
          </FormItem>
          { social !== null ?
            <FormItem label='Почта' error={errors.email} required>
            <Input value={values.email} onChange={_emailChanged} />
          </FormItem>
          : null}
          <BirthdayFormGroup setNextDisabled={setNextDisabled} />

          <NextButton onClick={_onClick} disabled={!isFormValid || nextDisabled} />
        </Form>
      </Container>
      {isUploadModalShowed && <UploadModal onClose={() => _toggleUploadModal()} />}
    </AuthLayout>
  )
}
