import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Spinner } from "@/application/components/spinner/Spinner"
import { useStore } from "effector-react"
import {
  $isFormValid,
  $loginForm,
  $loginFormErrors,
  $commonError,
  emailChanged,
  passwordChanged,
  loginFx,
  loginFormSended
} from "@app/pages/auth/pages/login/login.model"
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

const Error = styled.div`
  color: crimson;
  padding: 10px 0;
`

export const LoginForm = () => {
  const form = useStore($loginForm)
  const errors = useStore($loginFormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(loginFx.pending)
  const error = useStore($commonError)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    loginFormSended()
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Почта' error={errors.email}>
        <Input value={form.email} onChange={emailChanged} />
      </FormItem>
      <FormItem label='Пароль' error={errors.password}>
        <Input value={form.password} onChange={passwordChanged} type='password' />
      </FormItem>
      {error && <Error>{error}</Error>}
      <StyledButton disabled={!isFormValid || isFetching}>Вход</StyledButton>
      {isFetching && <Spinner />}
    </StyledForm>
  )
}
