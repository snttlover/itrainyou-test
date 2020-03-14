import styled from "styled-components"

export const WhiteContainer = styled.div`
  width: 100%;
  max-width: 800px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.12), 0px 4px 12px rgba(0, 0, 0, 0.25);
  background: #fff;
  padding: 36px 100px 60px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
  }
  @media screen and (max-width: 480px) {
    box-shadow: none;
    padding-right: 20px;
    padding-left: 20px;
  }
`
