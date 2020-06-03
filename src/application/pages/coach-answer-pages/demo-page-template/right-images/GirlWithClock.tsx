import styled from "styled-components"
import girlWithCLock from './images/girl-with-clock.svg'
import {MediaRange} from "@/application/lib/responsive/media"

const StyledImage = styled.img.attrs({ src: girlWithCLock })`
  width: 156.23px;
  height: 240px;
  ${MediaRange.lessThan(`mobile`)`
    width: 100.24px;
    height: 154px;
  `}
`

export const GirlWithClock = () => <StyledImage />
