import * as React from "react"
import styled from "styled-components"
import { changeMobileFiltersVisibility } from "./mobile-tabs.model"
import { useStore, useStoreMap } from "effector-react"
import { $coachesList, $searchPageQuery, addSearchPageQuery } from "@app/pages/search/coaches-search.model"
import { sortingItems } from "@app/pages/search/content/list/content/sorting/items"

import sortingArrow from "./images/sorting-arrow.svg"
import { CoachSortingType } from "@app/lib/api/coach"
import { SortingContainer, SortingPicker } from "@app/pages/search/content/list/content/sorting/SortingPicker"

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

export const MobileTabs = () => {
  const current = useStoreMap({
    store: $searchPageQuery,
    keys: [`ordering`],
    fn: values => values.ordering || `popularity`
  })

  const navigate = (sort: CoachSortingType) => {
    addSearchPageQuery({
      ordering: sort
    })
  }

  return (
    <Container>
      <StyledSortingPicker current={current} sort={navigate}>
        <Tab>
          Сортировка
          <Arrow />
        </Tab>
      </StyledSortingPicker>
      <Tab onClick={() => changeMobileFiltersVisibility(true)}>Фильтры</Tab>
    </Container>
  )
}
