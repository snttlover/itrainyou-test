import { fetchCategoriesList } from "@/feature/categories/categories.store"
import { useEffect } from "react"
import * as React from "react"
import styled from "styled-components"
import { Dropdown } from "@/components/dropdown/Dropdown"
import {
  $categoriesList,
  $categoriesPickerVisibility,
  changeCategoriesPickerVisibility,
} from "./categories-picker.model"
import { useEvent, useStore } from "effector-react/ssr"
import { Categories } from "@/pages/landing/content/top-bar/categories-picker/Categories"

const Label = styled.div`
  font-size: 16px;
  line-height: 22px;
  position: relative;
  display: inline;
  color: #424242;
`

const Counter = styled.div`
  position: absolute;
  left: calc(100% + 2px);
  top: -8px;
  color: #3b8ac3;
  font-size: 12px;
  line-height: 26px;
  font-weight: bold;
`

const StyledDropdown = styled(Dropdown)`
  width: 156px;
`

type CategoriesPickerTypes = {
  className?: string
}

export const CategoriesPicker = (props: CategoriesPickerTypes) => {
  const selectedCategories = useStore($categoriesList).filter(category => category.checked).length
  const titleRenderer = () => <Label>Категории {!!selectedCategories && <Counter>{selectedCategories}</Counter>}</Label>

  const pickerVisibility = useStore($categoriesPickerVisibility)
  const changeStatus = useEvent(changeCategoriesPickerVisibility)
  const fetchCategories = useEvent(fetchCategoriesList)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <StyledDropdown
      className={props.className}
      renderTitle={titleRenderer}
      opened={pickerVisibility}
      onOpen={changeStatus}
      onClose={changeStatus}
    >
      <Categories />
    </StyledDropdown>
  )
}
