import styled from "styled-components"

export const WhiteContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 52px 100px 60px;
  margin: 0 auto;
  border-radius: 2px;
  @media screen and (max-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
  }
  @media screen and (max-width: 480px) {
    box-shadow: none;
    padding-right: 20px;
    padding-left: 20px;
    background: transparent;
    color: #fff;
  }
`
