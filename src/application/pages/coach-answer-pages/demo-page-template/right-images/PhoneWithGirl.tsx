import styled from "styled-components"
import phoneWithGirl from './images/phone-with-girl.svg'
import {MediaRange} from "@/application/lib/responsive/media"

const StyledImage = styled.img.attrs({ src: phoneWithGirl })`
  width: 240px;
  height: 236.81px;
  ${MediaRange.lessThan(`mobile`)`
    width: 156px;
    height: 154px;
  `}
`

export const PhoneWithGirl = () => <StyledImage />
