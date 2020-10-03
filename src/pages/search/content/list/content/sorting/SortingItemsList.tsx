import * as React from "react"
import styled from "styled-components"
import { SearchInputItem } from "@/components/search-input/SearchInputItem"
import { sortingItems, SortingItemType } from "@/pages/search/content/list/content/sorting/items"
import {PickerTypes} from "@/pages/search/content/list/content/sorting/SortingPicker"

export const StyledSortingItem = styled(SearchInputItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
`

export const SortingItemIcon = styled.img`
  margin-left: 20px;
  height: 8px;
  width: 12px;
`

type PropsTypes = {
  onClick: (item: SortingItemType) => void
} & Partial<PickerTypes>

export const SortingItemsList = (props: PropsTypes) => {
  return (
    <>
      {sortingItems.map(item => (
        <StyledSortingItem
          key={item.value}
          onClick={() => props.onClick(item)}
          className={item.value === props.current ? `active` : ``}
        >
          {item.text}
          <SortingItemIcon src={item.icon} />
        </StyledSortingItem>
      ))}
    </>
  )
}
