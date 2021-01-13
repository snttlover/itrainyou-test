import * as React from "react"
import styled from "styled-components"
import { SearchInputItem } from "@/components/search-input/SearchInputItem"
import { useState } from "react"
import { ClickOutside } from "@/components/click-outside/ClickOutside"
import { CoachSortingType } from "@/lib/api/coach"
import { SortingItemsList } from "@/pages/search/content/list/content/sorting/SortingItemsList"
import { SortingItemType } from "@/pages/search/content/list/content/sorting/items"

const StyledPicker = styled.div`
  display: inline;
  position: relative;
`

export const SortingContainer = styled.div`
  display: inline;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  background: #fff;
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  border-radius: 4px;
  z-index: 2;
  overflow: hidden;
  padding-top: 12px;
  padding-bottom: 12px;
`

const PickerContainer = styled.div`
  display: inherit;
  flex: 1;
  cursor: pointer;
`

export type PickerTypes = {
  current: CoachSortingType
  sort: (sorting: CoachSortingType) => void
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export const SortingPicker = (props: PickerTypes) => {
  const [isVisible, changeVisibility] = useState(false)

  const itemClickHandler = (item: SortingItemType) => {
    props.sort(item.value)
    changeVisibility(false)
  }

  return (
    <ClickOutside onClickOutside={() => changeVisibility(false)}>
      <StyledPicker className={props.className}>
        <PickerContainer className={isVisible ? "opened" : ""} onClick={() => changeVisibility(!isVisible)}>
          {props.children}
        </PickerContainer>
        {isVisible && (
          <SortingContainer>
            <SortingItemsList {...props} onClick={(item) => itemClickHandler(item)} />
          </SortingContainer>
        )}
      </StyledPicker>
    </ClickOutside>
  )
}
