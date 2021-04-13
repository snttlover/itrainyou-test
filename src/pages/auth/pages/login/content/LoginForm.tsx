import { PasswordInput } from "@/oldcomponents/input/PasswordInput"
import * as React from "react"
import styled from "styled-components"
import { Input } from "@/oldcomponents/input/Input"
import { DashedButton } from "@/oldcomponents/button/dashed/DashedButton"
import { FormItem } from "@/oldcomponents/form-item/FormItem"
import { Spinner } from "@/oldcomponents/spinner/Spinner"
import { useStore, useEvent } from "effector-react"
import {
  $isFormValid,
  $loginForm,
  $loginFormErrors,
  emailChanged,
  passwordChanged,
  loginFx,
  loginFormSent,
} from "@/pages/auth/pages/login/login.model"
import { FormEvent } from "react"
import { MediaRange } from "@/lib/responsive/media"

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledButton = styled(DashedButton)`
  margin: 28px auto 0;
  width: 160px;

  @media screen and (max-width: 768px) {
    margin-top: 35px;
  }
  ${MediaRange.lessThan("mobile")`
    background: #fff !important;
  `}
`

export const LoginForm = () => {
  const form = useStore($loginForm)
  const errors = useStore($loginFormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(loginFx.pending)

  const _loginFormSent = useEvent(loginFormSent)
  const _emailChanged = useEvent(emailChanged)
  const _passwordChanged = useEvent(passwordChanged)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    _loginFormSent()
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Почта' error={errors.email}>
        <Input value={form.email} name='email' type='email' onChange={_emailChanged} />
      </FormItem>
      <FormItem label='Пароль' error={errors.password}>
        <PasswordInput value={form.password} name='password' onChange={_passwordChanged} />
      </FormItem>
      <StyledButton disabled={!isFormValid || isFetching}>Вход</StyledButton>
      {isFetching && <Spinner />}
    </StyledForm>
  )
}
