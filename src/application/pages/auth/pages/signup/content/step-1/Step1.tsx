import { FormItem } from "@/application/components/form-item/FormItem"
import { Input } from "@/application/components/input/Input"
import { AuthLayout } from "@/application/components/layouts/auth/AuthLayout"
import { logout } from "@/application/feature/user/user.model"
import { MediaRange } from "@/application/lib/responsive/media"
import { NextButton } from "@/application/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@/application/pages/auth/pages/signup/components/Steps"
import Link from "next/link"
import { useEffect } from "react"
import {
  $isFormValid,
  $step1Form,
  $step1FormErrors,
  emailChanged,
  passwordChanged,
  passwordRepeatChanged,
  registerFx,
  step1Registered
} from "./step1.model"
import { useStore } from "effector-react"
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
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  margin-bottom: 73px;

  text-align: center;
  color: #FFFFFF;

  ${MediaRange.greaterThan("mobile")`
    font-size: 36px;
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
  color: #9AA0A6;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  ${MediaRange.greaterThan('mobile')`
    display: block;
  `}
`

const Footer = styled.div`
  margin: 118px auto 34px;
  
  text-align: center;
  color: #544274;
  width: 130px;

  ${MediaRange.greaterThan("mobile")`
    width: auto;
    margin-top: 16px;
    font-size: 20px;
    line-height: 26px;
  `}
`

const StyledLink = styled.a`
  color: #FFFFFF;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  
  ${MediaRange.greaterThan("mobile")`    
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
  `}
`

const SignIn = styled.span`
  font-weight: 600;
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

  useEffect(() => {
    logout()
  }, [])

  return (
    <AuthLayout>
      <Steps activeId='1'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
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
            <PasswordHint>Пароль должен быть не меньше 8 символов и содержать в себе только латинские буквы или цифры</PasswordHint>
          </FormItem>
          <NextButton disabled={!isFormValid || isFetching} />
        </Form>
      </Container>
      <Footer>
        <Link href='/login' as='/login' passHref>
          <StyledLink>Уже есть аккаунт? <SignIn>Войдите</SignIn></StyledLink>
        </Link>
      </Footer>
    </AuthLayout>
  )
}
