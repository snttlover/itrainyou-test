import React, { FormEvent } from "react"
import styled from "styled-components"
import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { useEvent, useStore } from "effector-react/ssr"
import {
  $changePasswordForm,
  passwordChanged,
  oldPasswordChanged,
  passwordRepeatChanged,
  $changePasswordFormErrors,
  $isPasswordFormFormValid,
  changePasswordFx,
} from "@/pages/common/settings/content/password-form.model"
import { Spinner } from "@/components/spinner/Spinner"
import { MediaRange } from "@/lib/responsive/media"

const StyledForm = styled.form`
  width: 100%;
  margin-top: 24px;
  position: relative;
`

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 20px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 22px;
  `}
`

const StyledFormItem = styled(FormItem)`
  margin-bottom: 20px;
`

const StyledSpinner = styled(Spinner)`
  background: rgba(236, 239, 241, 0.24);
`

const Actions = styled.div`
  ${MediaRange.lessThan(`tablet`)`
     display: flex;
     justify-content: center;
   `}
`

export const PasswordForm = () => {
  const form = useStore($changePasswordForm)
  const errors = useStore($changePasswordFormErrors)
  const isFormValid = useStore($isPasswordFormFormValid)
  const isFetching = useStore(changePasswordFx.pending)
  const changePassword = useEvent(changePasswordFx)
  const oldPasswordChange = useEvent(oldPasswordChanged)
  const passwordChange = useEvent(passwordChanged)
  const passwordRepeatChange = useEvent(passwordRepeatChanged)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    changePassword({ password: form.password, oldPassword: form.oldPassword })
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <Title>Новый пароль</Title>
      <StyledFormItem label='Старый пароль' error={errors.oldPassword}>
        <Input type='password' value={form.oldPassword} onChange={oldPasswordChange} />
      </StyledFormItem>
      <StyledFormItem label='Новый пароль' error={errors.password}>
        <Input type='password' value={form.password} onChange={passwordChange} />
      </StyledFormItem>
      <StyledFormItem label='Повторите новый пароль' error={errors.passwordRepeat}>
        <Input type='password' value={form.passwordRepeat} onChange={passwordRepeatChange} />
      </StyledFormItem>
      <Actions>
        <DashedButton disabled={!isFormValid || isFetching}>Изменить пароль</DashedButton>
      </Actions>
      {isFetching && <StyledSpinner />}
    </StyledForm>
  )
}
