import { useList } from "effector-react"
import {
  $categoriesList,
  toggleCategorySelection
} from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import * as React from "react"
import styled from "styled-components"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { useState } from "react"


export const StyledCategoryCheckbox = styled(Checkbox)`
  padding: 7px 10px;
  &:hover {
    background: #F8F8FD;
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


type CheckBoxWrapperTypes = {
  children: React.ReactNode,
  description: string
}

// ToDo: переверстать в спринте 3
const Description = styled.div` 
  display: none;
  position: fixed;
  z-index: 200;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  line-height: 22px;
  padding: 16px;
  width: 400px;
  border-radius: 4px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
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

export const Categories = () => {
  return (
    <>
      {useList($categoriesList, item => (
        <CheckBoxWrapper description={item.description}>
          <StyledCategoryCheckbox value={item.checked} onChange={e => toggleCategorySelection(item.id)}>
            <CategoryIcon src={item.icon} />
            <Text>{item.name}</Text>
          </StyledCategoryCheckbox>
        </CheckBoxWrapper>
      ))}
    </>
  )
}
