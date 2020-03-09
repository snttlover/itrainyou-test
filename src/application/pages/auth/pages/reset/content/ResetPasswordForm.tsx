import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Spinner } from "@/application/components/spinner/Spinner"
import { useStore } from "effector-react"
import { FormEvent } from "react"
import {
  $password,
  $repeatedPassword,
  $resetPasswordError,
  $resetPasswordFetching,
  resetPasswordFx,
  updatePassword,
  updateRepeatedPassword
} from "@/application/pages/auth/pages/reset/model"

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
  }
`

const Error = styled.div`
  color: crimson;
  padding: 10px 0;
`

type ResetPasswordFormTypes = {
  token: string
}

export const ResetPasswordForm = (props: ResetPasswordFormTypes) => {
  const password = useStore($password)
  const passwordRepeat = useStore($repeatedPassword)
  const error = useStore($resetPasswordError)
  const loading = useStore($resetPasswordFetching)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    resetPasswordFx({ password, token: props.token })
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Пароль'>
        <Input value={password} onChange={updatePassword} type='password' />
      </FormItem>
      <FormItem label='Повторите пароль'>
        <Input value={passwordRepeat} onChange={updateRepeatedPassword} type='password' />
      </FormItem>
      {error && <Error>{error}</Error>}
      <StyledButton>Изменить</StyledButton>
      {loading && <Spinner />}
    </StyledForm>
  )
}
