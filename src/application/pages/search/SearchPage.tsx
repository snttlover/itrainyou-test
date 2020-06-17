import {
  fetchCoachesListFx,
  resetSearchQuery,
  setSearchPageQuery,
} from "@/application/pages/search/coaches-search.model"
import { fetchMaxPriceFx } from "@/application/pages/search/content/filters/content/price-filter/price-filter.model"
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as React from "react"
import { PageContainer } from "@/application/components/page-container/PageContainer"
import { Content } from "./content/Content"
import { Sorting } from "./content/list/content/sorting/Sorting"
import { MobileTabs } from "./content/mobile-tabs/MobileTabs"
import { GuestLayout } from "@/application/components/layouts/behaviors/default/GuestLayout"
import { Filters } from "@/application/pages/search/content/filters/Filters"
import styled from "styled-components"
import { UserLayout } from "@/application/components/layouts/behaviors/user/UserLayout"

const StyledPageContainer = styled(PageContainer)`
  display: flex;
`

const ContentWrapper = styled.div`
  flex: 1;
`

const FiltersWrapper = styled.div``

export const SearchPage = () => {
  const router = useRouter()

  useEffect(() => {
    setSearchPageQuery(router.query)
    fetchCoachesListFx(router.query)
  }, [router.asPath])

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

export default SearchPage
