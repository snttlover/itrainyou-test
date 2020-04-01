import { useEffect, useState } from "react"
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

type CheckBoxWrapperTypes = {
  children: React.ReactNode,
  description: string
}

const Description = styled.div`
  position: fixed;
  z-index: 200;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  line-height: 22px;
  padding: 16px;
  width: 400px;
  border-radius: 4px;
`

const StyledCheckboxWrapper = styled.div``

const CheckBoxWrapper = (props: CheckBoxWrapperTypes) => {
  const [descriptionVisibility, changeDescriptionVisibility] = useState(false)
  const [coords, changeCoords] = useState({ x: 0, y: 0 })

  const mouseMoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    changeDescriptionVisibility(true)
    changeCoords({
      x: event.clientX + 20,
      y: event.clientY + 20
    })
  }

  const mouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    changeDescriptionVisibility(false)
  }

  const descriptionStyles = {
    left: `${coords.x}px`,
    top: `${coords.y}px`
  }

  return (
    <StyledCheckboxWrapper onMouseMove={mouseMoveHandler} onMouseLeave={mouseLeaveHandler}>
      {descriptionVisibility && <Description style={descriptionStyles}>{props.description}</Description>}
      {props.children}
    </StyledCheckboxWrapper>
  )
}

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
      <CheckBoxWrapper description={item.description}>
        <StyledCheckbox value={item.checked} onChange={e => toggleCategorySelection(item.id)}>
          <CategoryIcon src={item.icon} />
          <Text>{item.name}</Text>
        </StyledCheckbox>
      </CheckBoxWrapper>
    ))

  return (
    <StyledDropdown className={props.className} renderTitle={titleRenderer} onClose={() => navigate()}>
      {renderCheckboxes()}
    </StyledDropdown>
  )
}
