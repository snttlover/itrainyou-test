import * as React from "react"
import styled from "styled-components"
import { Input } from "#/components/input/Input"
import { DashedButton } from "#/components/button/dashed/DashedButton"
import { FormItem } from "#/components/form-item/FormItem"
import { Spinner } from "#/components/spinner/Spinner"
import { useStore, useEvent } from "effector-react/ssr"
import { FormEvent } from "react"
import {
  $commonError,
  $isFormValid,
  $resetForm,
  $resetFormErrors,
  passwordChanged,
  passwordRepeatChanged,
  resetFx,
} from "#/pages/auth/pages/reset-password/reset-password.model"

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(DashedButton)`
  margin: 60px auto 0;
  width: 160px;

  @media screen and (max-width: 480px) {
    margin-top: 110px;
    background: #3358d4;
    color: #fff;
  }
`

const Error = styled.div`
  color: crimson;
  padding: 10px 0;
`

const StyledSpinner = styled(Spinner)`
  @media screen and (max-width: 480px) {
    background: #eceff1;
    opacity: 0.8;
  }
`

type ResetPasswordFormTypes = {
  token: string
}

export const ResetPasswordForm = (props: ResetPasswordFormTypes) => {
  const form = useStore($resetForm)
  const errors = useStore($resetFormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(resetFx.pending)
  const error = useStore($commonError)

  const _resetFx = useEvent(resetFx)
  const _passwordChanged = useEvent(passwordChanged)
  const _passwordRepeatChanged = useEvent(passwordRepeatChanged)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    _resetFx({ password: form.password, token: props.token })
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Пароль' error={errors.password}>
        <Input value={form.password} onChange={_passwordChanged} type='password' />
      </FormItem>
      <FormItem label='Повторите пароль' error={errors.passwordRepeat}>
        <Input value={form.passwordRepeat} onChange={_passwordRepeatChanged} type='password' />
      </FormItem>
      {error && <Error>{error}</Error>}
      <StyledButton disabled={!isFormValid || isFetching}>Вход</StyledButton>
      {isFetching && <StyledSpinner />}
    </StyledForm>
  )
}
