import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #D3D7F3;
  padding-top: 40px;
  cursor: pointer;
`

export const CoachLink = () => (
  <Container>
    Стать коучем
  </Container>
)
