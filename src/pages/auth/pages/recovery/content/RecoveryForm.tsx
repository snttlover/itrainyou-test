import * as React from "react"
import styled from "styled-components"
import { Input } from "@/components/input/Input"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { FormItem } from "@/components/form-item/FormItem"
import { Spinner } from "@/components/spinner/Spinner"
import { useEvent, useStore } from "effector-react/ssr"
import {
  $commonError,
  $isFormValid,
  emailChanged,
  $recoveryForm,
  $recoveryFormErrors,
  recoveryFx,
  recoveryFormSended,
} from "@/pages/auth/pages/recovery/recovery.model"
import { FormEvent } from "react"

const Title = styled.h3`
  font-weight: 600;
  font-size: 32px;
  line-height: 26px;
  margin-bottom: 22px;
  width: 100%;
  text-align: center;
  font-family: Roboto Slab;

  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    padding-top: 20px;
    margin-bottom: 8px;
  }
`

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 32px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
  @media screen and (max-width: 480px) {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 40px;
    width: calc(100% + 8px);
    margin-left: -4px;
  }
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledButton = styled(DashedButton)`
  margin: 78px auto 0;
  width: 160px;

  @media screen and (max-width: 768px) {
    margin-top: 35px;
  }
  @media screen and (max-width: 480px) {
    background: #3358d4;
    color: #fff;
  }
`

const StyledSpinner = styled(Spinner)`
  @media screen and (max-width: 480px) {
    background: #eceff1;
    opacity: 0.8;
  }
`

const Error = styled.div`
  color: crimson;
  padding: 10px 0;
`

export const RecoveryForm = () => {
  const form = useStore($recoveryForm)
  const errors = useStore($recoveryFormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(recoveryFx.pending)
  const error = useStore($commonError)
  const _recoveryFormSended = useEvent(recoveryFormSended)
  const _emailChanged = useEvent(emailChanged)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    _recoveryFormSended()
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <Title>Восстановление пароля</Title>
      <SubTitle>Забыли пароль? Не страшно! Мы отправим вам на почту письмо с инструкциями по сбросу пароля.</SubTitle>
      <FormItem label='Почта' error={errors.email}>
        <Input value={form.email} onChange={_emailChanged} />
      </FormItem>
      {error && <Error>{error}</Error>}
      <StyledButton disabled={!isFormValid || isFetching}>Отправить</StyledButton>
      {isFetching && <StyledSpinner />}
    </StyledForm>
  )
}
