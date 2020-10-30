import { FormItem } from "@/components/form-item/FormItem"
import { Input } from "@/components/input/Input"
import { PasswordInput } from "@/components/input/PasswordInput"
import { AuthLayout } from "@/components/layouts/sections/auth/AuthLayout"
import { MediaRange } from "@/lib/responsive/media"
import { Socials } from '@/pages/auth/pages/login/content/Socials'
import { NextButton } from "@/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/pages/auth/pages/signup/components/Steps"
import { userDataReset } from "@/pages/auth/pages/signup/signup.model"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
  $isFormValid,
  $step1Form,
  $step1FormErrors,
  emailChanged,
  passwordChanged,
  passwordRepeatChanged,
  registerFx,
  step1Gate,
  step1Registered,
  step1RegisteredFromSocials,
} from "./step1.model"
import { useEvent, useGate, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${MediaRange.greaterThan("mobile")`
    margin: 123px 36px 0;
    padding: 36px 48px 31px;
    border-radius: 2px;
    background: #FFFFFF;
  `}

  ${MediaRange.greaterThan("laptop")`
    margin: 20px 170px 0;
    padding: 36px 100px 31px;
  `}
`

const Title = styled.h1`
  font-family: Roboto Slab;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  margin-bottom: 73px;

  text-align: center;
  color: #ffffff;

  ${MediaRange.greaterThan("mobile")`
    font-size: 32px;
    line-height: 44px;
    color: #424242;
  `}
`

const Form = styled.form`
  color: #fff;
  ${NextButton} {
    margin-left: auto;
  }
  ${MediaRange.greaterThan("mobile")`
    color: inherit;
  `}
`

const PasswordHint = styled.p`
  display: none;
  color: #9aa0a6;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

const Footer = styled.div`
  margin: 118px auto 34px;

  text-align: center;
  color: #544274;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 16px;
    font-size: 20px;
    line-height: 26px;
  `}
`

const StyledLink = styled(Link)`
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;

  width: 130px;

  ${MediaRange.greaterThan("mobile")`
    width: auto;
    font-size: 20px;
    line-height: 26px;
  `}
`

const SignIn = styled.span`
  font-weight: 500;
`

const AcceptionText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;

  max-width: 460px;
  margin: 20px auto;

  & a {
    color: #fff;
    font-weight: 500;
    text-decoration: underline;
  }
`

export const Step1 = () => {
  const form = useStore($step1Form)
  const errors = useStore($step1FormErrors)
  const isFormValid = useStore($isFormValid)
  const isFetching = useStore(registerFx.pending)
  const _userDataReset = useEvent(userDataReset)
  const _step1Registered = useEvent(step1Registered)
  const _step1RegisteredFromSocials = useEvent(step1RegisteredFromSocials)
  const _emailChanged = useEvent(emailChanged)
  const _passwordChanged = useEvent(passwordChanged)
  const _passwordRepeatChanged = useEvent(passwordRepeatChanged)

  useGate(step1Gate)

  useEffect(() => {
    _userDataReset()
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    _step1Registered()
  }

  const handleSocials = (event: any )  => {
    event.preventDefault()
    _step1RegisteredFromSocials()
    console.log("SOCIALS")
  }

  return (
    <AuthLayout>
      <Steps activeId='1'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
      <Container>
        <Title onClick={handleSocials}>Регистрация</Title>
        <Socials onClick={handleSocials} />
        <Form onSubmit={handleSubmit}>
          <FormItem label='Почта' error={errors.email}>
            <Input value={form.email} type='email' name='email' onChange={_emailChanged} />
          </FormItem>
          <FormItem label='Пароль' error={errors.password}>
            <PasswordInput value={form.password} name='password' onChange={_passwordChanged} />
          </FormItem>
          <FormItem label='Повторите пароль' error={errors.passwordRepeat}>
            <PasswordInput
              value={form.passwordRepeat}
              type='password'
              name='repeat-password'
              onChange={_passwordRepeatChanged}
            />
            {!errors.passwordRepeat && (
              <PasswordHint>
                Пароль должен быть не меньше 8 символов и содержать в себе только латинские буквы или цифры
              </PasswordHint>
            )}
          </FormItem>
          <NextButton disabled={!isFormValid || isFetching} />
        </Form>
      </Container>
      <Footer>
        <StyledLink to='/auth/login'>
          Уже есть аккаунт? <SignIn>Войдите</SignIn>
        </StyledLink>
        <AcceptionText>
          Регистрируясь вы принимаете условия <a href='/confidentially.pdf'>Политики конфиденциальности</a>,{" "}
          <a href='/policy.pdf'>Политике по обработке персональных данных</a>
        </AcceptionText>
      </Footer>
    </AuthLayout>
  )
}
