import * as React from "react"
import styled, { css } from "styled-components"
import { useStore } from "effector-react"
import { $coachesList, $searchPageQuery, addSearchPageQuery } from "@/pages/search/coaches-search.model"
import { declOfNum, DeclOfNumListType } from "@/lib/formatting/numerals"
import { CoachSortingType } from "@/lib/api/coach"
import { sortingItems } from "@/pages/search/content/list/content/sorting/items"
import { SortingItemIcon, SortingItemsList } from "@/pages/search/content/list/content/sorting/SortingItemsList"
import { SearchInputItem } from "@/oldcomponents/search-input/SearchInputItem"
import { MediaRange } from "@/lib/responsive/media"
import { changeMobileFiltersVisibility } from "@/pages/search/content/mobile-tabs/mobile-tabs.model"
import { hasFilters } from "@/pages/search/content/mobile-tabs/MobileTabs"

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  //margin-right: 220px;
  padding: 0px 80px 20px 40px;
  width: 100%;

  @media screen and (max-width: 963px) {
    padding-right: 26px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding-top: 20px;
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

const TabletFiltersButton = styled.div<{ pin?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  cursor: pointer;
  position: relative;
  display: none;

  ${MediaRange.lessThan("tablet")`
    display: flex;
  `}

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

const SortingText = styled.div`
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 20px;
  color: #424242;
`

const SortingLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${SearchInputItem} {
    text-transform: lowercase;
    background: transparent;
    font-size: 16px;
    line-height: 22px;
    padding: 0;
    padding-right: 20px;
    &:first-child {
      padding-left: 0;
    }
    &.active {
      color: #4858cc;
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

const coaches: DeclOfNumListType = ["коуч отсортирован", "коуча отсортированы", "коучей отсортированы"]

export const Sorting = () => {
  const list = useStore($coachesList)
  const query = useStore($searchPageQuery)
  const current = query.ordering || "popularity"

  const currentItem = sortingItems.find(item => item.value === current)?.value || "popularity"

  const navigate = (sort: CoachSortingType) => {
    addSearchPageQuery({
      ordering: sort,
    })
  }

  return (
    <Container>
      <StyledSorting>
        <SortingItemsWrapper>
          {!!list.length && (
            <>
              <SortingText>
                {list.length} {declOfNum(list.length, coaches)}
              </SortingText>

              <SortingLinksWrapper>
                <SortingItemsList current={currentItem} onClick={item => navigate(item.value)} />
              </SortingLinksWrapper>
            </>
          )}
        </SortingItemsWrapper>
        <TabletFiltersButton pin={hasFilters(query)} onClick={() => changeMobileFiltersVisibility(true)}>
          Фильтры
        </TabletFiltersButton>
      </StyledSorting>
    </Container>
  )
}
