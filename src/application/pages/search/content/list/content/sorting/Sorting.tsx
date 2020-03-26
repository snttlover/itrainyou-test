import * as React from "react"
import styled from "styled-components"
import { useStore, useStoreMap } from "effector-react"
import { $coachesList, $searchPageQuery, addSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import { declOfNum, DeclOfNumListType } from "@/application/lib/formatting/numerals"
import { SortingPicker } from "@/application/pages/search/content/list/content/sorting/SortingPicker"
import { CoachSortingType } from "@/application/lib/api/coach"
import { sortingItems } from "@/application/pages/search/content/list/content/sorting/items"

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
  min-height: 20px;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`

const PickerLink = styled.div`
  text-decoration: underline;
  display: inline;
  text-transform: lowercase;
`

const couches: DeclOfNumListType = [`коуч отсортирован`, `коуча отсортированы`, `коучей отсортированы`]

export const Sorting = () => {
  const list = useStore($coachesList)
  const current = useStoreMap({
    store: $searchPageQuery,
    keys: [`ordering`],
    fn: values => values.ordering || `popularity`
  })

  const currentItem = sortingItems.find(item => item.value === current)

  const navigate = (sort: CoachSortingType) => {
    addSearchPageQuery({
      ordering: sort
    })
  }

  return (
    <Container>
      <StyledSorting>
        {!!list.length && (
          <>
            {list.length} {declOfNum(list.length, couches)} по{" "}
            <SortingPicker current={current} sort={navigate}>
              <PickerLink>{currentItem ? currentItem.text : `количеству отзывов`}</PickerLink>
            </SortingPicker>
          </>
        )}
      </StyledSorting>
    </Container>
  )
}
