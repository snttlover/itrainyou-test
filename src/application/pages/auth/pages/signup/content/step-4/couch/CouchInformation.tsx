import { Button } from "@/application/components/button/normal/Button"
import { $categoriesList } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import { CategoryCard } from "@/application/pages/auth/pages/signup/content/step-4/couch/CategoryCard"
import { CheckStep } from "@/application/pages/auth/pages/signup/content/step-4/couch/check-step/CheckStep"
import { Form } from "@/application/pages/auth/pages/signup/content/step-4/couch/Form"
import { UploadVideo } from "@/application/pages/auth/pages/signup/content/step-4/couch/UploadVideo"
import { $step4FormValid, videoUploadFx } from "@/application/pages/auth/pages/signup/content/step-4/step-4-couch.model"
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
import arrow from "./check-step/arrow.svg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0 0;
  ${MediaRange.greaterThan("mobile")`
    margin: 44px 0 0;
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
    width: 610px;
    margin: 0 auto;
  `}
`

const CategoriesTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  ${MediaRange.greaterThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`

const CheckStepsContainer = styled.div`
  margin: 32px auto 0;
  display: none;
  
  ${CheckStep} {
    margin-left: 48px;
    &:first-of-type {
      margin-left: 0;
    }
    
    &:not(:last-of-type):after {
      content: "";
      width: 18px;
      height: 12px;
      background: url("${arrow}");
      position: absolute;
      top: 50%;
      left: 100%;
      margin-left: 15px;
      
      transform: translateY(-50%);
    }
  }
  
  ${MediaRange.greaterThan("tablet")`  
    display: flex;
  `}
  
  ${MediaRange.greaterThan("laptop")`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    margin-right: 10px;
    
    ${CheckStep} {
      margin-left: 0;
      margin-top: 40px;
      &:first-of-type {
        margin-top: 0;
      }
      &:not(:last-of-type):after {
        top: 100%;
        left: 50%;
        margin-top: 15px;
        margin-left: 0;
        
        transform: translateX(-50%) rotate(90deg);
      }
    }
  `}
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
const SendRequestButton = styled(Button)`
  margin: 32px auto 44px;
  background: #544274;
`
export const CouchInformation = () => {
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
        <CheckStep description='Супервизор одобрит вашу заявку' img={approve} />
        <CheckStep description='Эта анкета будет видна клиентам<br /> (кроме контактов)' img={peoples} />
      </CheckStepsContainer>
      <ButtonContainer>
        <SendRequestButton disabled={loading || isVideoUploading || !isFormValid} onClick={() => userRegistered()}>
          Отправить заявку
        </SendRequestButton>
      </ButtonContainer>
    </Container>
  )
}
