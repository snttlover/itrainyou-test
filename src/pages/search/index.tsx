import dynamic from "next/dynamic"
import React from "react"

const SearchPage = dynamic(() => import("@/application/pages/search/SearchPage"), { ssr: false })

export default SearchPage
