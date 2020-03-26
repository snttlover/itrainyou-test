import { Button } from "@/application/components/button/normal/Button"
import { $categoriesList } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import { Steps } from "@/application/pages/auth/pages/signup/components/Steps"
import { Step4ClientLayout } from "@/application/pages/auth/pages/signup/content/step-4/client/Step4ClientLayout"
import {
  $userData,
  registerUserFx,
  toggleCategorySelection,
  userRegistered
} from "@/application/pages/auth/pages/signup/signup.model"
import { CategoryCard } from "./client/CategoryCard"
import { useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  min-width: 320px;
  max-width: 800px;
  margin: 71px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${MediaRange.greaterThan('mobile')`    
    margin: 71px auto 0;
  `}
`

const Title = styled.h2`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;

  text-align: center;
  
  ${MediaRange.greaterThan('mobile')`    
    font-size: 36px;
    line-height: 44px;
  `}
`

const Description = styled.p`
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  margin-top: 12px;

  
  ${MediaRange.greaterThan('mobile')`    
    font-size: 20px;
    line-height: 26px;
    margin-top: 22px;
  `}
`

const RegisterButton = styled(Button)`
  width: 207px;
  margin: 36px auto 30px;
`

export const Step4Client = () => {
  const selectedCategories = useStore($userData).categories
  const loading = useStore(registerUserFx.pending)

  const categories = useStore($categoriesList).map(category => (
    <CategoryCard
      key={category.id}
      category={category}
      selected={selectedCategories.includes(category.id)}
      onSelect={id => toggleCategorySelection(id)}
    />
  ))

  return (
    <Step4ClientLayout>
      <Steps activeId='4'>
        <Steps.Step id='1'>1</Steps.Step>
        <Steps.Step id='2'>2</Steps.Step>
        <Steps.Step id='3'>3</Steps.Step>
        <Steps.Step id='4'>4</Steps.Step>
      </Steps>
      <Container>
        <Title>Выберите направления, в которых вы хотели бы развиваться</Title>
        <Description>Потом вы сможете изменить интересы в своем профиле</Description>
        {categories}
        <RegisterButton disabled={loading} onClick={() => userRegistered()}>Зарегистрироваться</RegisterButton>
      </Container>
    </Step4ClientLayout>
  )
}
