import { fetchCategoriesListFx } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { fetchCoachesListFx, setSearchPageQuery } from "@/application/pages/search/coaches-search.model"
import { fetchMaxPriceFx } from "@/application/pages/search/content/filters/content/price-filter/price-filter.model"
import { SearchPage } from "@/application/pages/search/SearchPage"
import React from "react"

const Search = () => <SearchPage />

Search.getInitialProps = async ({ query }: any) => {
  setSearchPageQuery(query)
  await Promise.all([fetchMaxPriceFx(), fetchCoachesListFx(query), fetchCategoriesListFx()])
}

export default Search
