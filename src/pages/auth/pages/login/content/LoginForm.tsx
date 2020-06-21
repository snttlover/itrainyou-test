import { PasswordInput } from "@/components/input/PasswordInput"
import * as React from "react"
import styled from "styled-components"
import { Input } from "@/components/input/Input"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { FormItem } from "@/components/form-item/FormItem"
import { Spinner } from "@/components/spinner/Spinner"
import { useStore } from "effector-react/ssr"
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

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledButton = styled(DashedButton)`
  margin: 16px auto 0;
  width: 160px;

  @media screen and (max-width: 768px) {
    margin-top: 35px;
  }
`

export const LoginForm = () => {
  const form = useStore($loginForm)
  const errors = useStore($loginFormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(loginFx.pending)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    loginFormSent()
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Почта' error={errors.email}>
        <Input value={form.email} name='email' type='email' onChange={emailChanged} />
      </FormItem>
      <FormItem label='Пароль' error={errors.password}>
        <PasswordInput value={form.password} name='password' onChange={passwordChanged} />
      </FormItem>
      <StyledButton disabled={!isFormValid || isFetching}>Вход</StyledButton>
      {isFetching && <Spinner />}
    </StyledForm>
  )
}
