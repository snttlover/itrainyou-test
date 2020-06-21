import * as React from "react"
import { SearchInput } from "@/components/search-input/SearchInput"
import { SearchInputItem } from "@/components/search-input/SearchInputItem"
import searchIcon from "./images/search.svg"
import { updateSearch, $search, find, $hintsList } from "@/pages/landing/content/top-bar/search/search.model"
import { useStore } from "effector-react/ssr"
import { useState } from "react"
import styled, { css } from "styled-components"
import { $searchPageQuery } from "@/pages/search/coaches-search.model"
import { Icon } from "@/components/icon/Icon"
import { Input } from "@/components/input/Input"

type SearchIconTypes = {
  focused: boolean
}

const iconStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 1;
`

const SearchIcon = styled(Icon).attrs({ name: `search` })<SearchIconTypes>`
  fill: ${props => (props.focused ? `#4858CC` : `#5B6670`)};
  ${iconStyles}
`

const CloseIcon = styled(Icon).attrs({ name: `close` })`
  fill: #4858cc;
  ${iconStyles}
`

const Container = styled.div`
  position: relative;
  flex: 1;

  ${Input}:focus ~ ${SearchIcon} {
    fill: #fff;
  }
`

type SearchProps = {
  className?: string
}

export const Search = (props: SearchProps) => {
  const [focused, changeFocus] = useState(false)
  const params = useStore($searchPageQuery)
  const query = useStore($search)

  const hints = useStore($hintsList)
  const [selectedHint, changeSelectedHint] = useState(-1)
  const next = () => {
    changeSelectedHint(selectedHint + 1 >= hints.length ? -1 : selectedHint + 1)
  }

  const prev = () => {
    changeSelectedHint(selectedHint - 1 < -1 ? hints.length - 1 : selectedHint - 1)
  }

  const searchHandler = (value?: string) => {
    if (value !== undefined) {
      return find(value)
    }

    if ((!params.search || !decodeURI(params.search).trim()) && !query.trim()) {
      return
    }
    find(query)
  }

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (selectedHint !== -1) {
        searchHandler(hints[selectedHint].value)
        changeSelectedHint(-1)
        return
      }

      searchHandler()
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

  const getIcon = () => {
    if (!query) {
      return <SearchIcon focused={focused} onClick={() => searchHandler()} />
    }
    return <CloseIcon onClick={() => searchHandler(``)} />
  }

  return (
    <Container className={props.className}>
      {getIcon()}
      <SearchInput
        className={props.className}
        value={query}
        onChange={updateSearch}
        onFocus={() => {
          updateSearch(query)
          changeFocus(true)
        }}
        onBlur={() => {
          changeFocus(false)
        }}
        placeholder='Поиск по коучам'
        onKeyDown={keydownHandler}
      >
        {hints.map((hint, i) => (
          <SearchInputItem key={hint.id} onClick={() => searchHandler(hint.value)} isActive={selectedHint === i}>
            {hint.value}
          </SearchInputItem>
        ))}
      </SearchInput>
    </Container>
  )
}
