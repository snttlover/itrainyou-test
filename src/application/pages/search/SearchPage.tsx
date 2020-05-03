import {
  fetchCoachesListFx, resetSearchQuery,
  setSearchPageQuery
} from "@/application/pages/search/coaches-search.model"
import { fetchMaxPriceFx } from "@/application/pages/search/content/filters/content/price-filter/price-filter.model"
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as React from "react"
import { PageContainer } from "@/application/components/page-container/PageContainer"
import { TopBar } from "@/application/pages/landing/content/top-bar/TopBar"
import { Content } from "./content/Content"
import { Sorting } from "./content/list/content/sorting/Sorting"
import { MobileTabs } from "./content/mobile-tabs/MobileTabs"
import {GrayLayout} from "@/application/components/layouts/default/GrayLayout"

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
    <GrayLayout>
      <TopBar/>
      <PageContainer>
        <MobileTabs/>
        <Sorting/>
        <Content />
      </PageContainer>
    </GrayLayout>
  )
}
