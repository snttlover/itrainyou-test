import { START } from "@/lib/effector"
import { parseQueryString } from "@/lib/helpers/query"
import { loadCoaches, pageLoaded, resetSearchQuery, setSearchPageQuery } from "@/pages/search/coaches-search.model"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import { useEffect } from "react"
import { PageContainer } from "@/oldcomponents/page-container/PageContainer"
import { Content } from "./content/Content"
import { Sorting } from "./content/list/content/sorting/Sorting"
import { MobileTabs } from "./content/mobile-tabs/MobileTabs"
import { Filters } from "@/pages/search/content/filters/Filters"
import styled from "styled-components"
import { UserLayout } from "@/oldcomponents/layouts/behaviors/user/UserLayout"
import { useLocation } from "react-router-dom"
import { MediaRange } from "@/lib/responsive/media"
import { $isLoggedIn } from "@/feature/user/user.model"
import { GetCoachesParamsTypes } from "@/lib/api/coach"

const StyledPageContainer = styled(PageContainer)`
  display: flex;
  
  ${MediaRange.greaterThan("laptop")`
    padding-left: 14px;
  `}
`

const ContentWrapper = styled.div`
   width: 100%;
  max-width: 700px;
  ${MediaRange.lessThan("tablet")`
    flex: 1;
    max-width: 100%;
  `}
`

const FiltersWrapper = styled.div``

export const SearchPage = () => {
  const isLoggedIn = useStore($isLoggedIn)
  const reset = useEvent(resetSearchQuery)
  const setQueryParams = useEvent(setSearchPageQuery)
  const fetchCoaches = useEvent(loadCoaches)
  const location = useLocation()

  useEffect(() => {
    const query = (parseQueryString(location.search) as GetCoachesParamsTypes)

    // Для незарегистрированных пользователей показываем только коучей с бесплатными сессиями
    if (!isLoggedIn) {
      delete query.session_duration_types
      query["promo_and_paid_sessions"] = true
    }

    setQueryParams(query)
    fetchCoaches()

    return () => reset()
  }, [location.search, isLoggedIn])

  return (
    <UserLayout>
      <StyledPageContainer>
        <ContentWrapper>
          <MobileTabs />
          <Sorting />
          <Content freeSessions={!isLoggedIn} />
        </ContentWrapper>
        <FiltersWrapper>
          <Filters />
        </FiltersWrapper>
      </StyledPageContainer>
    </UserLayout>
  )
}

SearchPage[START] = pageLoaded
