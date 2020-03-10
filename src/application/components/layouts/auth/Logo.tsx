import styled from "styled-components"
import logo from "./images/logo.svg"

export const Logo = styled.img.attrs({ src: logo })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  left: 22px;
  top: 25px;
  width: 80px;
  height: 80.26px;
  @media screen and (max-width: 480px) {
    left: 16px;
    top: 16px;
    width: 60px;
    height: 60.19px;
  }
`
