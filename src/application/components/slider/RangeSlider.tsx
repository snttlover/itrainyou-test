import * as React from "react"
import styled from "styled-components"
// @ts-ignore
import ReactSlider from "react-slider"

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`

const StyledThumb = styled.div`
  z-index: 10;
  height: 12px;
  width: 12px;
  background: #449bd9;
  border-radius: 50%;
  cursor: grab;
  top: 50%;
  outline: none;
  transform: translateY(-50%);
`

const Thumb = (props: any) => <StyledThumb {...props} />

type TrackStateTypes = {
  index: number
}

const StyledTrack = styled.div<TrackStateTypes>`
  top: 50%;
  transform: translateY(-50%);
  background: ${props => (props.index === 1 ? "#449bd9" : "#a3cff3")};
  border-radius: 10px;
  height: 2px;
`

const Track = (props: any, state: TrackStateTypes) => <StyledTrack {...props} index={state.index} />

const Container = styled.div`
  position: relative;
  cursor: pointer;
`

type RangeSliderPropsTypes = {
  value: number[]
  max: number
  min: number
  onChange: (value: [number, number]) => void
}

export const RangeSlider = (props: RangeSliderPropsTypes) => (
  <Container>
    <StyledSlider
      value={props.value}
      min={props.min}
      max={props.max}
      renderTrack={Track}
      renderThumb={Thumb}
      onChange={props.onChange}
    />
  </Container>
)
