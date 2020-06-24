import { START } from "@/lib/effector"
import { resetSearchQuery, serverStartedQueryParams } from "@/pages/search/coaches-search.model"
import { fetchMaxPriceFx } from "@/pages/search/content/filters/content/price-filter/price-filter.model"
import { useEffect } from "react"
import * as React from "react"
import { PageContainer } from "@/components/page-container/PageContainer"
import { Content } from "./content/Content"
import { Sorting } from "./content/list/content/sorting/Sorting"
import { MobileTabs } from "./content/mobile-tabs/MobileTabs"
import { Filters } from "@/pages/search/content/filters/Filters"
import styled from "styled-components"
import { UserLayout } from "@/components/layouts/behaviors/user/UserLayout"

const StyledPageContainer = styled(PageContainer)`
  display: flex;
`

const ContentWrapper = styled.div`
  flex: 1;
`

const FiltersWrapper = styled.div``

export const SearchPage = () => {
  useEffect(() => {
    fetchMaxPriceFx()
    return () => {
      resetSearchQuery()
    }
  }, [])

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

SearchPage[START] = serverStartedQueryParams
