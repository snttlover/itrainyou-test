import * as React from "react"
import styled from "styled-components"

type SearchInputItemTypes = {
  isActive?: boolean
}

export const SearchInputItem = styled.div<SearchInputItemTypes>`
  padding: 8px 21px;
  font-size: 16px;
  line-height: 22px;
  background: ${({ isActive }) => (isActive ? `#F8F8FD` : `#fff`)};
  cursor: pointer;
  &:hover {
    background: #F8F8FD;
  }
`
