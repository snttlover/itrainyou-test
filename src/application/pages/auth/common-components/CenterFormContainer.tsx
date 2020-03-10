import styled from "styled-components"

export const CenterFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: auto;
  height: auto;
  min-width: 100%;
  min-height: 100%;

  @media screen and (max-width: 872px) {
    padding-right: 36px;
    padding-left: 36px;
  }
  @media screen and (max-width: 480px) {
    padding-right: 0;
    padding-left: 0;
  }
`
