import * as React from "react"
import styled, { css } from "styled-components"
import { changeMobileFiltersVisibility } from "./mobile-tabs.model"
import { useStore } from "effector-react"
import { $searchPageQuery, addSearchPageQuery } from "@/pages/search/coaches-search.model"
import { CoachSortingType, GetCoachesParamsTypes } from "@/lib/api/coach"
import { SortingContainer, SortingPicker } from "@/pages/search/content/list/content/sorting/SortingPicker"
import downArrow from "@/pages/search/content/list/content/sorting/images/down-arrow.svg"

import { sortingItems } from "@/pages/search/content/list/content/sorting/items"
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

const Arrow = styled.img.attrs(props => ({ src: props.src || downArrow }))`
  width: 9px;
  height: 6px;
  margin-left: 3px;
`

const StyledSortingPicker = styled(SortingPicker)`
  display: flex;
  flex: 1;
  ${SortingContainer} {
    top: 100%;
    left: 25px;
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
        background: #ff6b00;
        border-radius: 50%;
        right: -7px;
        top: 0px;
      }
    `}
`

const usedFilters: (keyof GetCoachesParamsTypes)[] = [
  "price__lte",
  "price__gte",
  "price",
  "is_top_coach",
  "rating",
  "rating__gte",
  "nearest_session_date__gte",
  "nearest_session_date__lte",
  "session_duration_types",
]

export const hasFilters = (params: GetCoachesParamsTypes) => {
  return usedFilters.reduce((hasFilter, currentKey): boolean => hasFilter || !!params[currentKey], false)
}

export const MobileTabs = () => {
  const params = useStore($searchPageQuery)

  const current = params.ordering || `popularity`

  const navigate = (sort: CoachSortingType) => {
    addSearchPageQuery({
      ordering: sort,
    })
  }

  const currentFilter = sortingItems.find(item => item.value === params.ordering)

  const getFilterName = () => {
    const filter = currentFilter
    return filter ? filter.text : `Сортировка`
  }

  return (
    <Container>
      <StyledSortingPicker current={current} sort={navigate}>
        <Tab>
          {getFilterName()}
          <Arrow src={currentFilter ? currentFilter.icon : undefined} />
        </Tab>
      </StyledSortingPicker>
      <StyledFiltersTab onClick={() => changeMobileFiltersVisibility(true)}>
        <Filters pin={hasFilters(params)}>Фильтры</Filters>
      </StyledFiltersTab>
    </Container>
  )
}
