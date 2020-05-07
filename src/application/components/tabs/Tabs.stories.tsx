import * as React from "react"
import { Tabs, Tab } from "./Tabs"
import { useState } from "react"
import styled from "styled-components"

export default {
  title: "Tabs"
}

const radioItems = [
  {
    id: 1,
    text: "First"
  },
  {
    id: 2,
    text: "Second"
  },
  {
    id: 3,
    text: "Third"
  }
]

const Container = styled.div`
  width: 900px;
  padding: 20px;
  background: #eee;
`

export const normal = () => {
  const [value, change] = useState(1)

  return (
    <Container>
      <Tabs value={value} onChange={change} name='someName'>
        {radioItems.map(item => (
          <Tab key={item.id} value={item.id}>
            {item.text}
          </Tab>
        ))}
      </Tabs>
    </Container>
  )
}
