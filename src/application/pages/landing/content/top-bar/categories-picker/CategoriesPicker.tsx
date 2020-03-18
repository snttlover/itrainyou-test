import * as React from "react"
import styled from "styled-components"
import { Dropdown } from "@/application/components/dropdown/Dropdown"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { $categoriesList, toggleCategorySelection } from "./categories-picker.model"
import { useList, useStore } from "effector-react"

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
  color: #424242;
  margin-left: 8px;
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`

const Label = styled.div`
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

type CategoriesPickerTypes = {
  className?: string
}

export const CategoriesPicker = (props: CategoriesPickerTypes) => {
  const selectedCategories = useStore($categoriesList).filter(category => category.checked).length
  const titleRenderer = () => <Label>Категории {!!selectedCategories && <Counter>{selectedCategories}</Counter>}</Label>

  const renderCheckboxes = () =>
    useList($categoriesList, item => (
      <StyledCheckbox value={item.checked} onChange={e => toggleCategorySelection(item.id)}>
        <CategoryIcon src={item.icon} />
        <Text>{item.name}</Text>
      </StyledCheckbox>
    ))

  return (
    <Dropdown className={props.className} renderTitle={titleRenderer}>
      {renderCheckboxes()}
    </Dropdown>
  )
}
