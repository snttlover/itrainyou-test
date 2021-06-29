import { Button } from "@/oldcomponents/button/normal/Button"
import { $categoriesList } from "@/feature/categories/categories.store"
import { MediaRange } from "@/lib/responsive/media"
import { Step4ClientLayout } from "@/pages/auth/pages/signup/content/step-4/client/Step4ClientLayout"
import { CategoryCard } from "./client/CategoryCard"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { PriceRanges } from "@/pages/auth/pages/signup/content/step-4/client/PriceRanges"
import { $userData, categoriesChanged, registerUserFx, registerUser, $rangeSelected } from "@/pages/auth/pages/signup/models/units"

const Container = styled.div`
  max-width: 660px;
  margin: 0 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${MediaRange.greaterThan("mobile")`    
    margin: 0 32px 0;
  `}
  
  ${MediaRange.greaterThan("tablet")`
    margin: 0 auto 0;
  `}

  ${MediaRange.greaterThan("laptop")`
    margin: 0 auto 0;
  `}
`

const Header = styled.div`
  margin: 24px 16px 0;

  ${MediaRange.greaterThan("mobile")`
    margin: 80px auto 0;
    max-width: 70%;
  `}
  ${MediaRange.greaterThan("laptop")`
    margin-top: 24px;  
    max-width: 664px;
  `}
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #fff;

  ${MediaRange.greaterThan("mobile")`    
    max-width: 528px; 
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  `}

  ${MediaRange.greaterThan("laptop")`    
    max-width: 660px;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  `}
`

const Description = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  margin: 12px 0;

  color: #fff;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    margin-top: 16px;
  `}

  ${MediaRange.greaterThan("laptop")`
    margin-top: 32px;
  `}
`

const FormTitle = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #424242;
  margin-top: 32px;

  ${MediaRange.lessThan("mobile")`
    font-size: 20px;
    line-height: 28px;    
    margin-top: 16px;
  `}
`

const ButtonContainer = styled.div`
  min-width: 320px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${MediaRange.greaterThan("mobile")`    
    margin: 20px 32px 0;
  `}
  
  ${MediaRange.greaterThan("tablet")`
    width: 664px;
    margin: 20px auto 0;
  `}

  ${MediaRange.greaterThan("laptop")`
    margin: 20px auto 0;
  `}
`

const RegisterButton = styled(Button)`
  width: 236px;
  margin: 36px auto 30px;
  transition: none;
  padding: 15px 24px;

  ${MediaRange.greaterThan("mobile")`
    margin: 36px 32px 30px auto;
  `}
  ${MediaRange.greaterThan("tablet")`
    margin: 36px 0 30px auto;
  `}
`

export const Step4Client = () => {
  const selectedCategories = useStore($userData).categories
  const loading = useStore(registerUserFx.pending)
  const _categoriesChanged = useEvent(categoriesChanged)
  const _registerUser = useEvent(registerUser)
  const rangeSelected = useStore($rangeSelected)

  const categories = useStore($categoriesList).map(category => (
    <CategoryCard
      key={category.id}
      category={category}
      selected={selectedCategories.includes(category.id)}
      onSelect={id => {
        if (selectedCategories.includes(id)) _categoriesChanged(selectedCategories.filter(cat => cat !== id))
        else _categoriesChanged([...selectedCategories, id])
      }}
    />
  ))

  return (
    <Step4ClientLayout
      renderHeader={() => (
        <Header>
          <Title>Анкета поможет узнать о вас немного больше</Title>
          <Description>Выберите, какие направления коучинга вас интересуют, чтобы мы могли порекомендовать подходящих специалистов</Description>
        </Header>
      )}
    >
      <Container>
        <FormTitle>Выберите направления</FormTitle>
        {categories}
        <FormTitle>Выберите стоимость сессии (1 сессия – 60 минут)</FormTitle>
        <PriceRanges />
        <ButtonContainer>
          <RegisterButton disabled={loading || !rangeSelected} onClick={() => _registerUser()}>
            Завершить регистрацию
          </RegisterButton>
        </ButtonContainer>
      </Container>
    </Step4ClientLayout>
  )
}
