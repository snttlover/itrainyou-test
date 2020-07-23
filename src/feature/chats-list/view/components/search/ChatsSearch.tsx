import React from "react"
import styled from "styled-components"
import { Input } from "@/components/input/Input"
import { Icon } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

export const ChatsSearch = () => (
  <Container>
    <StyledInput value='' onChange={() => {}} />
    <SearchIcon />
  </Container>
)

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 546px;
  ${MediaRange.lessThan(`tablet`)`
    max-width: 100%;
  `}
`

const StyledInput = styled(Input)`
  width: 100%;
  padding: 7px 20px;
  ${MediaRange.lessThan(`mobile`)`
    padding: 7px 8px;
  `}
`

const SearchIcon = styled(Icon).attrs({ name: `search` })`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  fill: #5b6670;
`
