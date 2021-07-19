import { fetchCategoriesList } from "@/feature/categories/categories.store"
import { parseQueryString } from "@/lib/helpers/query"
import { useEffect } from "react"
import * as React from "react"
import styled from "styled-components"
import { Dropdown } from "@/old-components/dropdown/Dropdown"
import {
  $categoriesList,
  $categoriesPickerVisibility,
  changeCategoriesPickerVisibility,
  setSelectedCategories,
} from "./categories-picker.model"
import { useEvent, useStore } from "effector-react"
import { Categories } from "@/pages/landing-old/content/top-bar/categories-picker/Categories"
import { useLocation } from "react-router-dom"

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

  const pickerVisibility = useStore($categoriesPickerVisibility)
  const changeStatus = useEvent(changeCategoriesPickerVisibility)
  const fetchCategories = useEvent(fetchCategoriesList)
  const setCategories = useEvent(setSelectedCategories)

  const location = useLocation()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const query = parseQueryString<{ categories?: string }>(location.search)
    const categoriesId = (query.categories?.split(",") || []).map(id => parseInt(id, 10)).filter(Number)
    setCategories(categoriesId)
  }, [location.search])

  return (
    <StyledDropdown
      className={props.className}
      renderTitle={() => <Label>Категории {!!selectedCategories && <Counter>{selectedCategories}</Counter>}</Label>}
      opened={pickerVisibility}
      onOpen={changeStatus}
      onClose={changeStatus}
    >
      <Categories />
    </StyledDropdown>
  )
}
