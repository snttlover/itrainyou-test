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
  background: ${props => (props.index === 1 ? "#a3cff3" : "#449bd9")};
  border-radius: 10px;
  height: 2px;
`

const Track = (props: any, state: TrackStateTypes) => <StyledTrack {...props} index={state.index} />

const StyledSections = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  z-index: 1;
  height: 0;
  transform: translateY(-50%);
  display: flex;
`

type SectionTypes = {
  filled: boolean
}

const Section = styled.div<SectionTypes>`
  position: relative;
  flex: 1;
  &:first-child:before,
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -1px;
    width: 2px;
    height: 2px;
    background: ${props => (props.filled ? "#a3cff3" : "#449bd9")};
  }
  &:first-child:before {
    left: 0;
    right: unset;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child:after {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

type SectionsTypes = {
  count: number
  filledIndex: number
}

const Sections = (props: SectionsTypes) => (
  <StyledSections>
    {new Array(props.count).fill(null).map((_, index) => (
      <Section filled={index < props.filledIndex} />
    ))}
  </StyledSections>
)

const Container = styled.div`
  position: relative;
  cursor: pointer;
`

type SliderPropsTypes = {
  value: number
  max: number
  min: number
  onChange: (value: number) => void
}

export const Slider = (props: SliderPropsTypes) => (
  <Container>
    <Sections filledIndex={props.value - props.min} count={props.max - props.min} />
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
