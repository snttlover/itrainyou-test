import * as React from "react"
import { SearchInput } from "./SearchInput"
import { SearchInputItem } from "./SearchInputItem"
import { useState } from "react"
import styled from "styled-components"

export default {
  component: SearchInput,
  title: "SearchInput"
}

const Container = styled.div`
  width: 500px;
`

const items = ["Item1", "Item2", "Item3"]

export const normal = () => {
  const [value, change] = useState("")
  const placeholder = "Type some text..."

  return (
    <Container>
      <SearchInput value={value} placeholder={placeholder} onChange={change}>
        {items.map((item, index) => (
          <SearchInputItem key={index} onClick={() => change(item)}>
            {item}
          </SearchInputItem>
        ))}
      </SearchInput>
    </Container>
  )
}
