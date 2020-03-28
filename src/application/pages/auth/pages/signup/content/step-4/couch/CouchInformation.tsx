import { Button } from "@/application/components/button/normal/Button"
import { $categoriesList } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import { CategoryCard } from "@/application/pages/auth/pages/signup/content/step-4/couch/CategoryCard"
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
  `};
  //
  ${MediaRange.greaterThan("tablet")`
    width: 610px;
    margin: 0 auto;
  `};
  //
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


const SendRequestButton = styled(Button)`
  margin: 36px auto 44px;
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
        <CategoriesTitle>Выберите направления, в которых вы проводите сессии:</CategoriesTitle>
        {categories}
      </CategoriesContainer>
      <Form />
      <UploadVideo />
      <SendRequestButton disabled={loading || isVideoUploading || !isFormValid} onClick={() => userRegistered()}>
        Отправить заявку
      </SendRequestButton>
    </Container>
  )
}
