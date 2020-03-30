import * as React from "react"
import styled, { css } from "styled-components"
import { changeMobileFiltersVisibility } from "./mobile-tabs.model"
import { useStore } from "effector-react"
import { $searchPageQuery, addSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import { CoachSortingType, GetCoachesParamsTypes } from "@/application/lib/api/coach"
import { SortingContainer, SortingPicker } from "@/application/pages/search/content/list/content/sorting/SortingPicker"

import sortingArrow from "./images/sorting-arrow.svg"
const Container = styled.div`
  display: none;
  width: 100%;
  @media screen and (max-width: 480px) {
    display: flex;
  }
`

const Tab = styled.div`
  background: #daebf7;
  border: 1px solid #a3cff3;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex: 1;
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
          Сортировка
          <Arrow />
        </Tab>
      </StyledSortingPicker>
      <Tab onClick={() => changeMobileFiltersVisibility(true)}>
        <Filters pin={hasFilters()}>Фильтры</Filters>
      </Tab>
    </Container>
  )
}
