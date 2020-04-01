import { useEffect } from "react"
import * as React from "react"
import styled from "styled-components"
import { Dropdown } from "@/application/components/dropdown/Dropdown"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { $categoriesList, fetchCategoriesListFx, toggleCategorySelection, updatePickerQuery } from "./categories-picker.model"
import { useEvent, useList, useStore } from "effector-react"

const StyledCheckbox = styled(Checkbox)`
  padding: 7px 10px;
  &:hover {
    background: #daebf7;
  }
`

const CategoryIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 19px;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-left: 8px;
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`

const Label = styled.div`
  font-size: 16px;
  line-height: 22px;
  position: relative;
  display: inline;
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
  const navigate = useEvent(updatePickerQuery)

  const selectedCategories = useStore($categoriesList).filter(category => category.checked).length
  const titleRenderer = () => <Label>Категории {!!selectedCategories && <Counter>{selectedCategories}</Counter>}</Label>

  useEffect(() => {
    fetchCategoriesListFx()
  }, [])

  const renderCheckboxes = () =>
    useList($categoriesList, item => (
      <StyledCheckbox value={item.checked} onChange={e => toggleCategorySelection(item.id)}>
        <CategoryIcon src={item.icon} />
        <Text>{item.name}</Text>
      </StyledCheckbox>
    ))

  return (
    <StyledDropdown className={props.className} renderTitle={titleRenderer} onClose={() => navigate()}>
      {renderCheckboxes()}
    </StyledDropdown>
  )
}
