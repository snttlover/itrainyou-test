import * as React from "react"
import { SearchInput } from "@/application/components/search-input/SearchInput"
import { SearchInputItem } from "@/application/components/search-input/SearchInputItem"
import searchIcon from "./images/search.svg"
import {
  updateSearch,
  $search,
  find,
  $hintsList,
  $searchLoading
} from "@app/pages/landing/content/top-bar/search/search.model"
import { useStore } from "effector-react"
import { useState } from "react"
import styled from "styled-components"

const Icon = styled.img.attrs({ src: searchIcon })`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`

const Container = styled.div`
  position: relative;
  flex: 1;
`

type SearchProps = {
  className?: string
}

export const Search = (props: SearchProps) => {
  const query = useStore($search)

  const hints = useStore($hintsList)
  const [selectedHint, changeSelectedHint] = useState(-1)
  const next = () => {
    changeSelectedHint(selectedHint + 1 >= hints.length ? -1 : selectedHint + 1)
  }

  const prev = () => {
    changeSelectedHint(selectedHint - 1 < -1 ? hints.length - 1 : selectedHint - 1)
  }

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (selectedHint !== -1) {
        find(hints[selectedHint].value)
        changeSelectedHint(-1)
        return
      }

      find(query)
    }

    if (e.keyCode === 40) {
      next()
      e.preventDefault()
    }

    if (e.keyCode === 38) {
      prev()
      e.preventDefault()
    }
  }

  return (
    <Container className={props.className}>
      <Icon onClick={() => find(query)} />
      <SearchInput
        className={props.className}
        value={query}
        onChange={updateSearch}
        onFocus={() => {
          updateSearch(query)
        }}
        placeholder='Поиск по коучам'
        onKeyDown={keydownHandler}
      >
        {hints.map((hint, i) => (
          <SearchInputItem key={hint.id} onClick={() => find(hint.value)} isActive={selectedHint === i}>
            {hint.value}
          </SearchInputItem>
        ))}
      </SearchInput>
    </Container>
  )
}
