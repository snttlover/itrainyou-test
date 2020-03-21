import { Button } from "@app/components/button/normal/Button"
import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { $categoriesList, loadCategories } from "@app/lib/categories/categories.store"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import { CategoryCard } from "./client/CategoryCard"
import { useList } from "effector-react"
import { useEffect } from "react"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;

  color: #424242;
  text-align: center;
`

const Description = styled.p`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-top: 12px;

  color: #544274;
`

const RegisterButton = styled(Button)`
  margin-top: 36px;
  margin-bottom: 30px;
`

export const Step4Client = () => {
  useEffect(() => loadCategories(), [])

  const categories = useList($categoriesList, category => (
    <CategoryCard category={category} onSelect={id => console.log(id)} />
  ))

  return (
    <AuthLayout>
      <Steps activeId='3'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
      <Container>
        <Title>Выберите направления, в которых вы хотели бы развиваться</Title>
        <Description>Потом вы сможете изменить интересы в своем профиле</Description>
        {categories}
        <RegisterButton>Зарегистрироваться</RegisterButton>
      </Container>
    </AuthLayout>
  )
}
