import { Button } from "@/application/components/button/normal/Button"
import { $categoriesList } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${MediaRange.greaterThan("mobile")`    
    margin: 20px 32px 0;
  `}

  ${MediaRange.greaterThan("tablet")`
    margin: 20px auto 0;
  `}
`

const Header = styled.div`
  margin: 24px 16px 0;
  ${MediaRange.greaterThan("mobile")`
    margin: 120px auto 0;
    max-width: 84%;
  `}
  ${MediaRange.greaterThan("tablet")`
    margin-top: 16px;  
    max-width: 664px;
  `}
`

const Title = styled.h2`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #fff;

  ${MediaRange.greaterThan("mobile")`    
    width: 432px;
    font-weight: bold;
    font-size: 24px;
    line-height: 26px;
  `}

  ${MediaRange.greaterThan("tablet")`    
    width: 565px;
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
  `}
`

const Description = styled.p`
  font-size: 16px;
  line-height: 22px;
  margin: 12px 0;

  color: #fff;

  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
    margin-top: 16px;
  `}

  ${MediaRange.greaterThan("tablet")`
    margin-top: 32px;
  `}
`

const RegisterButton = styled(Button)`
  width: 207px;
  margin: 36px auto 30px;

  ${MediaRange.greaterThan("mobile")`
    margin: 36px 32px 30px auto;
  `}
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
    <Step4ClientLayout
      renderHeader={() => (
        <Header>
          <Title>Выберите направления, в которых вы хотели бы развиваться</Title>
          <Description>Потом вы сможете изменить интересы в своем профиле</Description>
        </Header>
      )}
    >
      <Container>
        {categories}
        <RegisterButton disabled={loading} onClick={() => userRegistered()}>
          Зарегистрироваться
        </RegisterButton>
      </Container>
    </Step4ClientLayout>
  )
}
