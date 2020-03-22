import * as React from "react"
import styled from "styled-components"
import { CoachList } from "./content/CoachList"
import { $coachesList, $coachesListLoading } from "@app/pages/search/coaches-search.model"
import { useStore } from "effector-react"
import { Spinner } from "@app/components/spinner/Spinner"
import { ResetFiltersButton } from "@app/pages/search/content/filters/content/ResetFiltersButton"

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 80px;
  flex: 1;
  min-height: 1112px;
  padding-left: 26px;

  @media screen and (max-width: 963px) {
    padding-right: 26px;
  }
`

const ListContainer = styled.div`
  width: 100%;
  max-width: 640px;
  position: relative;
  display: table;
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const NotFoundText = styled.div`
  text-align: center;
`

const StyledResetFiltersButton = styled(ResetFiltersButton)`
  margin-top: 10px;
`

const NotFound = () => (
  <NotFoundText>
    <p>Ничего не найдено</p>
    <StyledResetFiltersButton />
  </NotFoundText>
)

export const List = () => {
  const loading = useStore($coachesListLoading)
  const list = useStore($coachesList)
  const notFound = !loading && !list.length && <NotFound />

  return (
    <Container>
      <ListContainer>
        <div>{notFound}</div>
        <div>
          {loading && (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          )}
        </div>
        <CoachList />
      </ListContainer>
    </Container>
  )
}
