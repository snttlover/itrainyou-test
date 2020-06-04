import styled from "styled-components"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { CategoryDescription } from "@/application/pages/landing/content/top-bar/categories-picker/CategoryDescription"
import { useList } from "effector-react"
import { $categoriesList } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { getCategoryColorById } from "@/application/feature/categories/categories.store"
import { MediaRange } from "@/application/lib/responsive/media"
import { $profileCategories } from "@/application/pages/dashboard/profile/profile-page.model"

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
  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
  `}
`

const StyledCategoriesDescription = styled(CategoryDescription)`
  margin-left: 10px;
  margin-top: 3px;
`

export const  InterestsCategories = () => {
  return (
    <Container>
      {useList($profileCategories, category => (
        <Category>
          <Checkbox value={category.selected} color={getCategoryColorById(category.id)} />
          <Name>{category.name}</Name>
          <StyledCategoriesDescription>{category.description}</StyledCategoriesDescription>
        </Category>
      ))}
    </Container>
  )
}