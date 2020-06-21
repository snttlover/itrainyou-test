import * as React from "react"
import { Dropdown } from "./Dropdown"
import { SearchInputItem } from "../search-input/SearchInputItem"
import { useState } from "react"
import styled from "styled-components"

export default {
  component: Dropdown,
  title: "Dropdown"
}

const Container = styled.div`
  width: 500px;
`

type ItemTypes = {
  active: boolean
}

const Item = styled(SearchInputItem)<ItemTypes>`
  background: ${props => (props.active ? `#daebf7` : `#fff`)};
`

const items = [`Item1`, `Item2`, `Item3`]

export const normal = () => {
  const [value, change] = useState(``)

  return (
    <Container>
      <p>selected value: {value}</p>
      <Dropdown renderTitle={() => <>Text</>}>
        {items.map(item => (
          <Item key={item} active={item === value} onClick={() => change(item)}>
            {item}
          </Item>
        ))}
      </Dropdown>
    </Container>
  )
}
