import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Spinner } from "@/application/components/spinner/Spinner"
import { useStore } from "effector-react"
import {
  $email,
  updateEmail,
  $password,
  updatePassword,
  loginFx,
  $loginError,
  $loginFetching
} from "@/application/pages/auth/pages/login/model"
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
  const email = useStore($email)
  const password = useStore($password)
  const error = useStore($loginError)
  const loading = useStore($loginFetching)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    loginFx({ email, password })
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Логин'>
        <Input value={email} onChange={updateEmail} />
      </FormItem>
      <FormItem label='Пароль'>
        <Input value={password} onChange={updatePassword} type='password' />
      </FormItem>
      { error && <Error>{error}</Error>}
      <StyledButton>Вход</StyledButton>
      {loading && <Spinner />}
    </StyledForm>
  )
}
