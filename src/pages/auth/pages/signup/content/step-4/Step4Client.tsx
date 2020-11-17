import { Button } from "@/components/button/normal/Button"
import { $categoriesList } from "@/feature/categories/categories.store"
import { MediaRange } from "@/lib/responsive/media"
import { Step4ClientLayout } from "@/pages/auth/pages/signup/content/step-4/client/Step4ClientLayout"
import { CategoryCard } from "./client/CategoryCard"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import { $userData, categoriesChanged, registerUserFx, userRegistered } from "@/pages/auth/pages/signup/models/init"

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

  ${MediaRange.greaterThan("laptop")`
    margin: 20px auto 0;
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
  font-size: 20px;
  line-height: 26px;
  color: #fff;

  ${MediaRange.greaterThan("mobile")`    
    width: 432px;
    font-weight: bold;
    font-size: 24px;
    line-height: 26px;
  `}

  ${MediaRange.greaterThan("laptop")`    
    width: 565px;
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
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
  width: 207px;
  margin: 36px auto 30px;
  transition: none;

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
  const _userRegistered = useEvent(userRegistered)

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
          <Title>Выберите направления, в которых вы хотели бы развиваться</Title>
          <Description>Потом вы сможете изменить интересы в своем профиле</Description>
        </Header>
      )}
    >
      <Container>
        {categories}
        <ButtonContainer>
          <RegisterButton disabled={loading} onClick={() => _userRegistered()}>
            Зарегистрироваться
          </RegisterButton>
        </ButtonContainer>
      </Container>
    </Step4ClientLayout>
  )
}
