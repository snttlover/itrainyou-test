import * as React from "react"
import styled from "styled-components"

type SearchInputItemTypes = {
  isActive?: boolean
}

export const SearchInputItem = styled.div<SearchInputItemTypes>`
  padding: 8px 21px;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  background: ${({ isActive }) => (isActive ? `#daebf7` : `#fff`)};
  cursor: pointer;
  &:hover {
    background: #daebf7;
  }
`
