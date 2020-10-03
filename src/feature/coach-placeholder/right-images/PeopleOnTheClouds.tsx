import styled from "styled-components"
import peopleOnTheClouds from "./images/people-on-the-clouds.svg"
import { MediaRange } from "#/lib/responsive/media"

export const PeopleOnTheClouds = styled.img.attrs({ src: peopleOnTheClouds })`
  width: 277.31px;
  height: 220px;
  ${MediaRange.lessThan(`mobile`)`
    width: 194.12px;
    height: 154px;
  `}
`
