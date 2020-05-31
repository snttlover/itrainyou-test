import styled from "styled-components"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { CategoryDescription } from "@/application/pages/landing/content/top-bar/categories-picker/CategoryDescription"
import { useList } from "effector-react"
import { $categoriesList } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { getCategoryColorById } from "@/application/feature/categories/categories.store"

const Container = styled.div`
  margin-top: 23px;
`

const Category = styled.div`
  display: flex;
  margin-bottom: 18px;
`

const Name = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 15px;
  display: flex;
  align-items: center;
`

const StyledCategoriesDescription = styled(CategoryDescription)`
  margin-left: 10px;
  margin-top: 3px;
`

export const  InterestsCategories = () => {
  return (
    <Container>
      {useList($categoriesList, category => (
        <Category>
          <Checkbox value={true} color={getCategoryColorById(category.id)} />
          <Name>{category.name}</Name>
          <StyledCategoriesDescription>{category.description}</StyledCategoriesDescription>
        </Category>
      ))}
    </Container>
  )
}
