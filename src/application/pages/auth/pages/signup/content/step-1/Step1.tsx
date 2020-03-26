import { FormItem } from "@app/components/form-item/FormItem"
import { Input } from "@app/components/input/Input"
import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { MediaRange } from "@app/lib/responsive/media"
import { NextButton } from "@app/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import {
  $isFormValid,
  $step1Form,
  $step1FormErrors,
  emailChanged,
  passwordChanged,
  passwordRepeatChanged, registerFx,
  step1Registered
} from "./step1.model"
import { Link } from "@reach/router"
import { useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"

const StyledSteps = styled(Steps)`
  ${MediaRange.greaterThan('laptop')`
    margin-right: 134px;
  `}
`

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${MediaRange.greaterThan('mobile')`
    margin: 123px 36px 0;
    padding: 36px 48px 31px;
    background: #FFFFFF;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.25);
  `}
  
  ${MediaRange.greaterThan('laptop')`
    margin: 20px 170px 0;
    padding: 36px 100px 31px;
  `}
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  margin-bottom: 73px;

  text-align: center;
  
  ${MediaRange.greaterThan('mobile')`
    font-size: 36px;
    line-height: 44px;
  `}
`

const Form = styled.form`
  ${NextButton} {
    margin-left: auto;
  }
`

const Footer = styled.div`
  margin: 118px auto 34px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #544274;
  width: 130px;
  
  ${MediaRange.greaterThan('mobile')`
    width: auto;
    margin-top: 36px;
    font-size: 20px;
    line-height: 26px;
  `}
`

const StyledLink = styled(Link)`
  color: #544274;
`

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  step1Registered()
}

export const Step1 = () => {
  const form = useStore($step1Form)
  const errors = useStore($step1FormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(registerFx.pending)

  return (
    <AuthLayout>
      <StyledSteps activeId='1'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </StyledSteps>
      <Container>
        <Title>Регистрация</Title>
        <Form onSubmit={handleSubmit}>
          <FormItem label='Почта' error={errors.email}>
            <Input value={form.email} type='email' onChange={emailChanged} />
          </FormItem>
          <FormItem label='Пароль' error={errors.password}>
            <Input value={form.password} type='password' onChange={passwordChanged} />
          </FormItem>
          <FormItem label='Повторите пароль' error={errors.passwordRepeat}>
            <Input value={form.passwordRepeat} type='password' onChange={passwordRepeatChanged} />
          </FormItem>
          <NextButton disabled={!isFormValid || isFetching} />
        </Form>
      </Container>
      <Footer>
        <StyledLink to='/login'>Уже есть аккаунт? Войдите</StyledLink>
      </Footer>
    </AuthLayout>
  )
}
