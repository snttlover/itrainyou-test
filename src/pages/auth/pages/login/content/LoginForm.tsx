import { PasswordInput } from "@/old-components/input/PasswordInput"
import * as React from "react"
import styled from "styled-components"
import { Input } from "@/old-components/input/Input"
import { DashedButton } from "@/old-components/button/dashed/DashedButton"
import { FormItem } from "@/old-components/form-item/FormItem"
import { Spinner } from "@/old-components/spinner/Spinner"
import { useStore, useEvent } from "effector-react"
import {
  $isFormValid,
  $loginForm,
  $loginFormErrors,
  phoneOrEmailChanged,
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
  const _phoneOrEmailChanged = useEvent(phoneOrEmailChanged)
  const _passwordChanged = useEvent(passwordChanged)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    _loginFormSent()
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Телефон или адрес эл. почты' error={errors.phoneOrEmail}>
        <Input value={form.phoneOrEmail} name='phoneOrEmail' onChange={_phoneOrEmailChanged} />
      </FormItem>
      <FormItem label='Пароль' error={errors.password}>
        <PasswordInput value={form.password} name='password' onChange={_passwordChanged} />
      </FormItem>
      <StyledButton disabled={!isFormValid || isFetching}>Вход</StyledButton>
      {isFetching && <Spinner />}
    </StyledForm>
  )
}
