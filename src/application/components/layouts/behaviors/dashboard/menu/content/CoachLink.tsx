import styled from "styled-components"
import { MediaRange } from "@/application/lib/responsive/media"

const Container = styled.div`
  width: 100%;
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
  padding-bottom: 20px;
  display: none;

  ${MediaRange.lessThan('mobile')`
     padding-bottom: 0;
  `}
  ${MediaRange.lessThan('tablet')`
    display: flex;
  `}
`

export const CoachLink = () => (
  <Container>
    Стать коучем
  </Container>
)
