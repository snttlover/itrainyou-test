import { Button } from "@/application/components/button/normal/Button"
import { Icon } from "@/application/components/icon/Icon"
import { $categoriesList } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import { CategoryCard } from "@/application/pages/auth/pages/signup/content/step-4/coach/CategoryCard"
import { CheckStep } from "@/application/pages/auth/pages/signup/content/step-4/coach/check-step/CheckStep"
import { Form } from "@/application/pages/auth/pages/signup/content/step-4/coach/Form"
import { UploadVideo } from "@/application/pages/auth/pages/signup/content/step-4/coach/UploadVideo"
import { $step4FormValid, videoUploadFx } from "@/application/pages/auth/pages/signup/content/step-4/step-4-coach.model"
import {
  $userData,
  registerUserFx,
  toggleCategorySelection,
  userRegistered
} from "@/application/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"
import study from "./check-step/study.svg"
import approve from "./check-step/approve.svg"
import peoples from "./check-step/peoples.svg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
  ${MediaRange.greaterThan("mobile")`
    margin: 40px 0 0;
  `}
`

const CategoriesContainer = styled.div`
  margin: 0 8px;

  ${CategoryCard} {
    margin-top: 16px;
  }

  ${MediaRange.greaterThan("mobile")`
    ${CategoryCard} {
      margin-top: 24px;
      
      &:first-of-type {
        margin-top: 28px;
      }
    }
  `}
  ${MediaRange.greaterThan("tablet")`
    width: 600px;
    margin: 0 auto;
  `}
`

const CategoriesTitle = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #7d36a8;
  ${MediaRange.greaterThan("mobile")`
    margin: 0 auto;
    width: 80%;
    max-width: 600px;
    font-size: 20px;
    line-height: 26px;
  `}
  ${MediaRange.greaterThan("tablet")`
    width: 600px;    
    font-size: 24px;
    line-height: 26px;
  `}
`

const CheckStepsContainer = styled.div`
  position: absolute;
  display: none;
  flex-direction: column;
  top: 0;
  right: 0;
  margin: 32px 10px 0 auto;

  ${MediaRange.greaterThan("laptop")`
    display: flex;    
  `}
`

const CheckStepArrow = styled(Icon).attrs({ name: "arrow" })`
  width: 24px;
  height: 24px;
  fill: #9aa0a6;
  margin: 0 auto;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const SendRequestButton = styled(Button)`
  width: 288px;
  margin: 32px auto 44px;
  ${MediaRange.greaterThan("mobile")`
    width: auto;
  `}
`

export const CoachInformation = () => {
  const selectedCategories = useStore($userData).categories

  const isFormValid = useStore($step4FormValid)

  const loading = useStore(registerUserFx.pending)
  const isVideoUploading = useStore(videoUploadFx.pending)

  const categories = useStore($categoriesList).map(category => (
    <CategoryCard
      key={category.id}
      category={category}
      selected={selectedCategories.includes(category.id)}
      disabled={selectedCategories.length >= 3}
      onSelect={id => toggleCategorySelection(id)}
    />
  ))

  return (
    <Container>
      <CategoriesContainer>
        <CategoriesTitle>Выберите направления, в которых Вы проводите сессии:</CategoriesTitle>
        {categories}
      </CategoriesContainer>
      <Form />
      <UploadVideo />
      <CheckStepsContainer>
        <CheckStep description='Эта заявка отправится супервизору' img={study} />
        <CheckStepArrow />
        <CheckStep description='Супервизор одобрит вашу заявку' img={approve} />
        <CheckStepArrow />
        <CheckStep description='Эта анкета будет видна клиентам<br /> (кроме контактов)' img={peoples} />
      </CheckStepsContainer>
      <ButtonContainer>
        <SendRequestButton
          secondary
          disabled={loading || isVideoUploading || !isFormValid}
          onClick={() => userRegistered()}
        >
          Зарегистрироваться
        </SendRequestButton>
      </ButtonContainer>
    </Container>
  )
}
