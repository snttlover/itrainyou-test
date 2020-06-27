import { START } from "@/lib/effector"
import { parseQueryString } from "@/lib/helpers/query"
import { resetSearchQuery, pageLoaded, setSearchPageQuery, loadCoaches } from "@/pages/search/coaches-search.model"
import { useEvent } from "effector-react/ssr"
import { useEffect } from "react"
import * as React from "react"
import { PageContainer } from "@/components/page-container/PageContainer"
import { Content } from "./content/Content"
import { Sorting } from "./content/list/content/sorting/Sorting"
import { MobileTabs } from "./content/mobile-tabs/MobileTabs"
import { Filters } from "@/pages/search/content/filters/Filters"
import styled from "styled-components"
import { UserLayout } from "@/components/layouts/behaviors/user/UserLayout"
import { useLocation } from "react-router-dom"

const StyledPageContainer = styled(PageContainer)`
  display: flex;
`

const ContentWrapper = styled.div`
  flex: 1;
`

const FiltersWrapper = styled.div``

export const SearchPage = () => {
  const reset = useEvent(resetSearchQuery)
  const setQueryParams = useEvent(setSearchPageQuery)
  const fetchCoaches = useEvent(loadCoaches)
  const location = useLocation()
  useEffect(() => {
    const query = parseQueryString(location.search)

    setQueryParams(query)
    fetchCoaches()

    return () => reset()
  }, [location.search])

  return (
    <UserLayout>
      <StyledPageContainer>
        <ContentWrapper>
          <MobileTabs />
          <Sorting />
          <Content />
        </ContentWrapper>
        <FiltersWrapper>
          <Filters />
        </FiltersWrapper>
      </StyledPageContainer>
    </UserLayout>
  )
}

SearchPage[START] = pageLoaded
