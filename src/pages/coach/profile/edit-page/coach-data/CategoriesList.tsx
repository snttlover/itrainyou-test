import { Loader } from "#/components/spinner/Spinner"
import { $categoriesList, fetchCategoriesListFx } from "#/feature/categories/categories.store"
import { $selectedCategories, toggleCategory } from "./coach-data.model"
import { CategoryCard } from "./CategoryCard"
import { MediaRange } from "#/lib/responsive/media"
import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"

const CategoriesContainer = styled.div`
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
`
const CategoriesTitle = styled.h3`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  ${MediaRange.greaterThan("mobile")`
    max-width: 600px;
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
  `}
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CategoriesList: React.FC = () => {
  const selectedCategories = useStore($selectedCategories)
  const _toggleCategory = useEvent(toggleCategory)
  const categoriesLoading = useStore(fetchCategoriesListFx.pending)

  const categories = useStore($categoriesList).map(category => (
    <CategoryCard
      key={category.id}
      category={category}
      selected={selectedCategories.includes(category.id)}
      disabled={selectedCategories.length >= 3}
      onSelect={id => _toggleCategory(id)}
    />
  ))

  return (
    <CategoriesContainer>
      <CategoriesTitle>Выберите направления, в которых вы проводите сессии:</CategoriesTitle>
      {categoriesLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        categories
      )}
    </CategoriesContainer>
  )
}
