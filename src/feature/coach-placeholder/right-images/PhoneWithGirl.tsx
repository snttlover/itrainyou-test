import styled from "styled-components"
import phoneWithGirl from "./images/phone-with-girl.svg"
import { MediaRange } from "#/lib/responsive/media"

export const PhoneWithGirl = styled.img.attrs({ src: phoneWithGirl })`
  width: 240px;
  height: 236.81px;
  ${MediaRange.lessThan(`mobile`)`
    width: 156px;
    height: 154px;
  `}
`
