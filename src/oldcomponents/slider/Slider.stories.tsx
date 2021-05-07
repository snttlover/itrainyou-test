import styled from "styled-components"
import * as React from "react"
import { Slider } from "./Slider"
import { RangeSlider } from "./RangeSlider"
import { useState } from "react"

export default {
  component: Slider,
  title: "Slider"
}

const Container = styled.div`
  width: 600px;
`

export const normal = () => {
  const [value, change] = useState(1)
  return (
    <Container>
      <Slider value={value} min={1} max={5} onChange={change} />
    </Container>
  )
}

export const range = () => {
  const [value, change] = useState([40, 60])
  return (
    <Container>
      <RangeSlider value={value} min={0} max={100} onChange={change} />
    </Container>
  )
}
