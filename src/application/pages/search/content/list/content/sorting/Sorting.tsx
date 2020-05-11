import * as React from "react"
import styled from "styled-components"
import { useStore } from "effector-react"
import { $coachesList, $searchPageQuery, addSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import { declOfNum, DeclOfNumListType } from "@/application/lib/formatting/numerals"
import { CoachSortingType } from "@/application/lib/api/coach"
import { sortingItems } from "@/application/pages/search/content/list/content/sorting/items"
import {
  SortingItemIcon,
  SortingItemsList
} from "@/application/pages/search/content/list/content/sorting/SortingItemsList"
import { SearchInputItem } from "@/application/components/search-input/SearchInputItem"
import { MediaRange } from "@/application/lib/responsive/media"
import { changeMobileFiltersVisibility } from "@/application/pages/search/content/mobile-tabs/mobile-tabs.model"

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin-right: 220px;
  padding: 20px 80px 20px 26px;

  @media screen and (max-width: 963px) {
    padding-right: 26px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`

const StyledSorting = styled.div`
  width: 100%;
  max-width: 640px;
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
`

const TabletFiltersButton = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  display: flex;
  cursor: pointer;
    
  ${MediaRange.greaterThan("tablet")`  
    display: block;
  `}
`

const SortingText = styled.div`
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 20px;
  color: #424242;
`

const SortingLinksWrapper = styled.div`
  display: flex;
  ${SearchInputItem} {
    text-transform: lowercase;
    background: transparent;
    font-size: 16px;
    line-height: 22px;
    padding: 0;
    padding-left: 20px;
    &:first-child {
      padding-left: 0;
    }
    &.active {
      color: #4858CC;
      background: transparent;
    }
    ${SortingItemIcon} {
      margin-left: 10px;
    }
    &:nth-child(1),
    &:nth-child(2) {
      ${SortingItemIcon} {
        display: none;
      }
    }
  }
`

const SortingItemsWrapper = styled.div`
  flex: 1;
`

const couches: DeclOfNumListType = [`коуч отсортирован`, `коуча отсортированы`, `коучей отсортированы`]

export const Sorting = () => {
  const list = useStore($coachesList)
  const query = useStore($searchPageQuery)
  const current = query.ordering || 'popularity'

  const currentItem = sortingItems.find(item => item.value === current)?.value || `popularity`

  const navigate = (sort: CoachSortingType) => {
    addSearchPageQuery({
      ordering: sort
    })
  }

  return (
    <Container>
      <StyledSorting>
        <SortingItemsWrapper>
          {!!list.length && (
            <>
              <SortingText>
                {list.length} {declOfNum(list.length, couches)}
              </SortingText>

              <SortingLinksWrapper>
                <SortingItemsList current={currentItem} onClick={(item) => navigate(item.value)} />
              </SortingLinksWrapper>
            </>
          )}
        </SortingItemsWrapper>
        <TabletFiltersButton onClick={() => changeMobileFiltersVisibility(true)}>Фильтры</TabletFiltersButton>
      </StyledSorting>
    </Container>
  )
}
