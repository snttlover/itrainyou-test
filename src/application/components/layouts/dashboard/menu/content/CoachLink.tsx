import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #D3D7F3;
  padding-top: 40px;
  cursor: pointer;
  justify-content: flex-end;
  
  ${MediaRange.greaterThan('mobile')`
     padding-bottom: 20px;
  `}
  ${MediaRange.greaterThan('tablet')`
    display: none;
  `}
`

export const CoachLink = () => (
  <Container>
    Стать коучем
  </Container>
)
