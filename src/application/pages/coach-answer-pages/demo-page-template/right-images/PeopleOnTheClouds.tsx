import styled from "styled-components"
import peopleOnTheClouds from './images/people-on-the-clouds.svg'
import {MediaRange} from "@/application/lib/responsive/media"

const StyledImage = styled.img.attrs({ src: peopleOnTheClouds })`
  width: 277.31px;
  height: 220px;
  ${MediaRange.lessThan(`mobile`)`
    width: 194.12px;
    height: 154px;
  `}
`

export const PeopleOnTheClouds = () => <StyledImage />
