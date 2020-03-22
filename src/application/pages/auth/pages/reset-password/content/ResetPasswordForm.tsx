import * as React from "react"
import styled from "styled-components"
import { Input } from "@/application/components/input/Input"
import { DashedButton } from "@/application/components/button/dashed/DashedButton"
import { FormItem } from "@/application/components/form-item/FormItem"
import { Spinner } from "@/application/components/spinner/Spinner"
import { useStore } from "effector-react"
import { FormEvent } from "react"
import {
  $commonError,
  $isFormValid,
  $resetForm,
  $resetFormErrors,
  passwordChanged,
  passwordRepeatChanged,
  resetFx
} from "@app/pages/auth/pages/reset-password/reset-password.model"

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
  const form = useStore($resetForm)
  const errors = useStore($resetFormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(resetFx.pending)
  const error = useStore($commonError)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    resetFx({ password: form.password, token: props.token })
    e.preventDefault()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <FormItem label='Пароль' error={errors.password}>
        <Input value={form.password} onChange={passwordChanged} type='password' />
      </FormItem>
      <FormItem label='Повторите пароль' error={errors.passwordRepeat}>
        <Input value={form.passwordRepeat} onChange={passwordRepeatChanged} type='password' />
      </FormItem>
      {error && <Error>{error}</Error>}
      <StyledButton disabled={!isFormValid || isFetching}>Вход</StyledButton>
      {isFetching && <Spinner />}
    </StyledForm>
  )
}