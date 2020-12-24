import { Button } from "@/components/button/normal/Button"
import { Icon } from "@/components/icon/Icon"
import { RegisterSteps } from "@/components/register-steps/RegisterSteps"
import { Loader } from "@/components/spinner/Spinner"
import { $categoriesList, fetchCategoriesListFx } from "@/feature/categories/categories.store"
import {
  $formValid,
  $selectedCategories,
  toggleCategory,
  videoUploadFx,
} from "@/feature/coach-get-access/coach-get-access.model"
import { MediaRange } from "@/lib/responsive/media"
import { CategoryCard } from "@/feature/coach-get-access/components/CategoryCard"
import { CheckStep } from "@/feature/coach-get-access/components/check-step/CheckStep"
import { Form } from "@/feature/coach-get-access/components/Form"
import { UploadVideo } from "@/feature/coach-get-access/components/UploadVideo"
import { useEvent, useStore, useList } from "effector-react"
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
    margin: 0;
    ${CategoryCard} {
      margin-top: 24px;
      
      &:first-of-type {
        margin-top: 28px;
      }
    }
  `}
  ${MediaRange.greaterThan("tablet")`
    max-width: 640px;
    margin: 0 auto;
  `}
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #783D9D;
  text-align: left;
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledRegisterSteps = styled(RegisterSteps)`
  margin-top: 52px;
  margin-bottom: 24px;
  display: none;

  ${MediaRange.greaterThan("mobile")`
    display: flex;
  `}
`

const SkipRegistration = styled.div`
  border-radius: 2px;
  background: #E1E6EA;
  padding: 24px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;  
    ${MediaRange.lessThan("mobile")`
    padding: 12px;
  `}
`

const StyledCategories = styled.div`
  background: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
    ${MediaRange.lessThan("mobile")`
    padding: 12px;
  `}
`

const Description = styled.div`
    font-family: Roboto;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #424242;
`

const StyledButton = styled(Button)`
    align-self: flex-end;    
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

type CoachInformationProps = {
  onRegisterClick: () => void
  onSkip?: () => void
  loading: boolean
  withoutCheckStep?: boolean
  className?: string
}

export const CoachInformation = ({
  onRegisterClick,
  onSkip,
  loading,
  withoutCheckStep = false,
  className,
}: CoachInformationProps) => {
  const selectedCategories = useStore($selectedCategories)

  const isFormValid = useStore($formValid)
  const isVideoUploading = useStore(videoUploadFx.pending)
  const categoriesLoading = useStore(fetchCategoriesListFx.pending)

  const _toggleCategory = useEvent(toggleCategory)

  const Categories =  () => {

    return (
      <StyledCategories>
        <Title>Выберите направления, в которых Вы проводите сессии:</Title>
        <ListContainer>
          {useList($categoriesList, category => (
            <CategoryCard
              key={category.id}
              category={category}
              selected={selectedCategories.includes(category.id)}
              disabled={selectedCategories.length >= 3}
              onSelect={id => _toggleCategory(id)}
            />
          ))}
        </ListContainer>
      </StyledCategories>
    )

  }

  return (
    <Container className={className}>


      <CategoriesContainer>
        { onSkip ? <SkipRegistration>
          <Title>Пропустить заполнение</Title>
          <Description>Вы сможете заполнить эту информацию позже</Description>
          <StyledButton data-secondary onClick={onSkip}>Пропустить</StyledButton>
        </SkipRegistration> : null}
        {categoriesLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <Categories />
        )}
      </CategoriesContainer>
      <Form />
      <UploadVideo />
      {!withoutCheckStep && (
        <CheckStepsContainer>
          <CheckStep description='Эта заявка отправится супервизору' img={study} />
          <CheckStepArrow />
          <CheckStep description='Супервизор одобрит вашу заявку' img={approve} />
          <CheckStepArrow />
          <CheckStep description='Вы зарегистрируете свой расчетный счет в ЮKassa' img={peoples} />
          <CheckStepArrow />
          <CheckStep description='Вы получите доступ к платформе' img={peoples} />
        </CheckStepsContainer>
      )}
      {withoutCheckStep && <StyledRegisterSteps />}
      <ButtonContainer>
        <SendRequestButton
          data-secondary
          disabled={loading || isVideoUploading || !isFormValid}
          onClick={onRegisterClick}
        >
          Отправить заявку
        </SendRequestButton>
      </ButtonContainer>
    </Container>
  )
}
