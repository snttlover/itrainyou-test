import * as React from "react"
import styled from "styled-components"
import { Dropdown } from "@/application/components/dropdown/Dropdown"
import { Checkbox } from "@/application/components/checkbox/Checkbox"

import items from "./mocks"

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

type CategoriesPickerTypes = {
  className?: string
}

export const CategoriesPicker = (props: CategoriesPickerTypes) => {
  const titleRenderer = () => <p>Категории</p>

  const renderCheckboxes = () =>
    items.map((item, index) => (
      <StyledCheckbox value={item.checked} key={index}>
        <CategoryIcon src={item.icon} />
        <Text>{item.text}</Text>
      </StyledCheckbox>
    ))

  return <Dropdown className={props.className} renderTitle={titleRenderer}>{renderCheckboxes()}</Dropdown>
}
