import styled from "styled-components"

export const Block = styled.div<{ inline?: boolean }>`
  background: #ffffff;
  border-radius: 2px;
  padding: 12px 8px;
  max-width: 600px;
  width: 100%;

  display: flex;
  flex-direction: ${({ inline }) => (inline ? "row" : "column")};
`
