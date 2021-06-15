import styled from "styled-components"
import logoImage from "./logo.svg"

export const Logo = styled.img.attrs({ src: logoImage })`
  width: 44px;
  height: 44px;
  
  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
  
  @media screen and (max-width: 480px) {
    width: 34px;
    height: 34px;
  }
`
