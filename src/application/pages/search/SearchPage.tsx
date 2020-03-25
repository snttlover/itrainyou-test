import { GetCoachesParamsTypes } from "@app/lib/api/coach"
import { keysToCamel } from "@app/lib/network/casing"
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

export const SearchPage = () => (
  <Layout>
    <PageContainer>
      <TopBar />
      <MobileTabs />
      <Sorting />
      <Content />
    </PageContainer>
  </Layout>
)

type QueryParams = {
  [key in keyof GetCoachesParamsTypes]: string
}

SearchPage.asyncData = async ({ scope, query }: AsyncDataOptions<{}, QueryParams>) => {
  const parsedQuery: GetCoachesParamsTypes = {
    price__lte: query.price__lte ? parseInt(query.price__lte) : undefined,
    price__gte: query.price__gte ? parseInt(query.price__gte) : undefined,
    rating__gte: query.rating__gte ? parseInt(query.rating__gte) : undefined,
    categories: query.categories ? query.categories.split(",").map(parseInt) : undefined,
    is_top_coach: query.is_top_coach ? query.is_top_coach === "true" : undefined,
    price: query.price ? parseInt(query.price) : undefined,
    rating: query.rating ? parseInt(query.rating) : undefined,
    search: query.search ? query.rating : undefined,
    // @ts-ignore
    ordering: query.ordering ? query.ordering : undefined,
    nearest_session_date__gte: query.nearest_session_date__gte ? query.nearest_session_date__gte : undefined,
    nearest_session_date__lte: query.nearest_session_date__lte ? query.nearest_session_date__lte : undefined
  }

  await allSettled(setSearchPageQuery, {
    scope,
    params: parsedQuery
  })
  await Promise.all([
    allSettled(loadMaxPrice, {
      scope,
      params: undefined
    }),
    allSettled(loadCoaches, {
      scope,
      params: parsedQuery
    }),
    allSettled(loadCategories, {
      scope,
      params: undefined
    })
  ])
}
