import { GetCoachesParamsTypes } from "@app/lib/api/coach"
import { getWindowQuery } from "@app/lib/helpers/getWindowQuery"
import { globalHistory } from "@reach/router"
import { useEvent } from "effector-react/ssr"
import { useEffect } from "react"
import * as React from "react"
import { Layout } from "@/application/components/layouts/default/Layout"
import { PageContainer } from "@/application/components/page-container/PageContainer"
import { TopBar } from "@/application/pages/landing/content/top-bar/TopBar"
import { Content } from "./content/Content"
import { AsyncDataOptions } from "@/application/routes"
import { allSettled } from "effector/fork"
import { loadCoaches, setSearchPageQuery } from "./coaches-search.model"
import { loadCategories } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { Sorting } from "./content/list/content/sorting/Sorting"
import { MobileTabs } from "./content/mobile-tabs/MobileTabs"
import { loadMaxPrice } from "@app/pages/search/content/filters/content/price-filter/price-filter.model"

export const SearchPage = () => {
  const _setSearchPageQuery = useEvent(setSearchPageQuery)
  useEffect(() => {
    globalHistory.listen(() => {
      const query = getWindowQuery() as GetCoachesParamsTypes
      _setSearchPageQuery(query)
    })
  }, [])

  return (
  <Layout>
    <PageContainer>
      <TopBar />
      <MobileTabs />
      <Sorting />
      <Content />
    </PageContainer>
  </Layout>
)}

SearchPage.asyncData = async ({ scope, query }: AsyncDataOptions) => {
  await allSettled(setSearchPageQuery, {
    scope,
    params: query
  })
  await Promise.all([
    allSettled(loadMaxPrice, {
      scope,
      params: undefined
    }),
    allSettled(loadCoaches, {
      scope,
      params: query
    }),
    allSettled(loadCategories, {
      scope,
      params: undefined
    })
  ])
}
