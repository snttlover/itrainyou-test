import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  max-width: 560px;
  background: #fff;
`

type ChatContainerTypes = {
  children: React.ReactChild | React.ReactChild[]
}

export const ChatContainer = (props: ChatContainerTypes) => <Container>{props.children}</Container>
