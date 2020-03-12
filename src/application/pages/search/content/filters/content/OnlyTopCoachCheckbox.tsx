import * as React from "react"
import styled from "styled-components"
import { Checkbox } from "@/application/components/checkbox/Checkbox"
import { useState } from "react"

const Container = styled.div`
  padding-top: 42px;
  padding-bottom: 36px;
`

const Text = styled.div`
  font-size: 16px;
  line-height: 22px;
  margin-left: 7px;
`

export const OnlyTopCoachCheckbox = () => {
  const [value, change] = useState(false)
  return (
    <Container>
      <Checkbox value={value} onChange={change}>
        <Text>Только топ коуч</Text>
      </Checkbox>
    </Container>
  )
}
