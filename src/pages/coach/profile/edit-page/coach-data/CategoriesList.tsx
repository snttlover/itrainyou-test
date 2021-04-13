import { Loader } from "@/oldcomponents/spinner/Spinner"
import { $categoriesList, fetchCategoriesListFx } from "@/feature/categories/categories.store"
import { $selectedCategories, toggleCategory } from "./coach-data.model"
//import { CategoryCard } from "./CategoryCard"
import { CategoryCard } from "@/feature/coach-get-access/components/CategoryCard"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useList, useStore } from "effector-react"
import * as React from "react"
import styled from "styled-components"

const CategoriesContainer = styled.div`
  margin: 0 auto;

  ${CategoryCard} {
    margin-top: 10px;
  }

  ${MediaRange.greaterThan("mobile")`
    margin: 0 auto;
    max-width: 640px;
    ${CategoryCard} {
      margin-top: 10px;
      
      &:first-of-type {
        margin-top: 10px;
      }
    }
  `}
  ${MediaRange.greaterThan("tablet")`
    max-width: 640px;
    margin: 0 auto;
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

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: #783D9D;
  text-align: left;
  margin-bottom: 8px;  

    ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 24px;
  `}
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
    <CategoriesContainer>
      {categoriesLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <Categories />
      )}
    </CategoriesContainer>
  )
}
