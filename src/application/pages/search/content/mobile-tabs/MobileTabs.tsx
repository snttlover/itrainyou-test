import * as React from "react"
import styled, { css } from "styled-components"
import { changeMobileFiltersVisibility } from "./mobile-tabs.model"
import { useStore } from "effector-react"
import { $searchPageQuery, addSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import { CoachSortingType, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { SortingContainer, SortingPicker } from "@/application/pages/search/content/list/content/sorting/SortingPicker"

import { sortingItems, SortingItemType } from "@/application/pages/search/content/list/content/sorting/items"

import sortingArrow from "./images/sorting-arrow.svg"
const Container = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    padding-top: 26px;
  }
`

const Tab = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex: 1;
`

const StyledFiltersTab = styled(Tab)`
  justify-content: flex-end;
`

const Arrow = styled.img.attrs({ src: sortingArrow })`
  width: 16px;
  height: 16px;
`

const StyledSortingPicker = styled(SortingPicker)`
  display: flex;
  flex: 1;
  ${SortingContainer} {
    top: 100%;
    left: 25px;
  }
  .opened ${Arrow} {
    transform: rotate(-180deg);
  }
`

const Filters = styled.span<{ pin?: boolean }>`
  position: relative;
  ${({ pin }) =>
    pin &&
    css`
      &:after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background: #d5584d;
        border-radius: 50%;
        right: -5px;
        top: -3px;
      }
    `}
`

export const MobileTabs = () => {
  const params = useStore($searchPageQuery)

  const current = params.ordering || `popularity`

  const navigate = (sort: CoachSortingType) => {
    addSearchPageQuery({
      ordering: sort
    })
  }

  const getFilterName = () => {
    const filter = sortingItems.find(item => item.value === params.ordering)
    return filter ? filter.text : `Сортировка`
  }

  const usedFilters: (keyof GetCoachesParamsTypes)[] = [
    "price__lte",
    "price__gte",
    "price",
    "is_top_coach",
    "rating",
    "rating__gte",
    "nearest_session_date__gte",
    "nearest_session_date__lte"
  ]

  const hasFilters = () => {
    return usedFilters.reduce((hasFilter, currentKey): boolean => hasFilter || !!params[currentKey], false)
  }

  return (
    <Container>
      <StyledSortingPicker current={current} sort={navigate}>
        <Tab>
          { getFilterName() }
          { !params.ordering && <Arrow /> }
        </Tab>
      </StyledSortingPicker>
      <StyledFiltersTab onClick={() => changeMobileFiltersVisibility(true)}>
        <Filters pin={hasFilters()}>Фильтры</Filters>
      </StyledFiltersTab>
    </Container>
  )
}
