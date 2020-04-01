import * as React from "react"
import styled from "styled-components"
import { SearchInputItem } from "@/application/components/search-input/SearchInputItem"
import { useState } from "react"
import { ClickOutside } from "@/application/components/click-outside/ClickOutside"
import { CoachSortingType } from "@/application/lib/api/coach"
import { sortingItems, SortingItemType } from "@/application/pages/search/content/list/content/sorting/items"

const StyledPicker = styled.div`
  display: inline;
  position: relative;
`

const StyledSearchInputItem = styled(SearchInputItem)`
  display: flex;
  justify-content: space-between;
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
  ${SearchInputItem} {
    white-space: nowrap;
  }
`

const PickerContainer = styled.div`
  display: inherit;
  flex: 1;
  cursor: pointer;
`

const Icon = styled.img`
  margin-left: 20px;
  width: 12px;
`

type PickerTypes = {
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
        <PickerContainer className={isVisible ? `opened` : ``} onClick={() => changeVisibility(!isVisible)}>
          {props.children}
        </PickerContainer>
        {isVisible && (
          <SortingContainer>
            {sortingItems.map(item => (
              <StyledSearchInputItem
                key={item.value}
                isActive={item.value === props.current}
                onClick={() => itemClickHandler(item)}
              >
                {item.text}
                <Icon src={item.icon} />
              </StyledSearchInputItem>
            ))}
          </SortingContainer>
        )}
      </StyledPicker>
    </ClickOutside>
  )
}
