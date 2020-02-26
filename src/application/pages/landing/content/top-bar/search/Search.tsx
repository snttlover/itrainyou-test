import * as React from "react"
import { SearchInput } from "@/application/components/search-input/SearchInput"
import { SearchInputItem } from "@/application/components/search-input/SearchInputItem"

type SearchProps = {
  className?: string
}

export const Search = (props: SearchProps) => {
  return (
    <SearchInput className={props.className} value={`text`}>
      <SearchInputItem>Text</SearchInputItem>
      <SearchInputItem>Text</SearchInputItem>
      <SearchInputItem>Text</SearchInputItem>
    </SearchInput>
  )
}
