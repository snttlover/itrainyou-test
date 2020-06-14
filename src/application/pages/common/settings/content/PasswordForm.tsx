import React, { FormEvent } from "react"
import styled from "styled-components"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { useStore } from "effector-react"
import {
  $changePasswordForm,
  passwordChanged,
  oldPasswordChanged,
  passwordRepeatChanged,
  $changePasswordFormErrors,
  $isPasswordFormFormValid,
  changePasswordFx,
} from "@/application/pages/common/settings/content/password-form.model"
import { Spinner } from "@/application/components/spinner/Spinner"
import { resetFx } from "@/application/pages/auth/pages/reset-password/reset-password.model"
import { MediaRange } from "@/application/lib/responsive/media"

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
  background: rgba(236,239,241,0.24);
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

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    changePasswordFx({ password: form.password, oldPassword: form.oldPassword })
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <Title>Новый пароль</Title>
      <StyledFormItem label='Старый пароль' error={errors.oldPassword}>
        <Input type='password' value={form.oldPassword} onChange={oldPasswordChanged} />
      </StyledFormItem>
      <StyledFormItem label='Новый пароль' error={errors.password}>
        <Input type='password' value={form.password} onChange={passwordChanged} />
      </StyledFormItem>
      <StyledFormItem label='Повторите новый пароль' error={errors.passwordRepeat}>
        <Input type='password' value={form.passwordRepeat} onChange={passwordRepeatChanged} />
      </StyledFormItem>
      <Actions>
        <DashedButton disabled={!isFormValid || isFetching}>
          Изменить пароль
        </DashedButton>
      </Actions>
      {isFetching && <StyledSpinner />}
    </StyledForm>
  )
}
