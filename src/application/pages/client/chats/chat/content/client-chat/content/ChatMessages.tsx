import styled from "styled-components"
import { ChatMessage } from "@/application/pages/client/chats/chat/content/client-chat/content/ChatMessage"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const ChatMessages = () => (
  <Container>
    <ChatMessage time='12:00' data-self={false}>
      Sint ex sint laborum reprehenderit. Deserunt cupidatat nulla incididunt fugiat officia officia nulla elit
      adipisicing aliquip exercitation.
    </ChatMessage>

    <ChatMessage time='12:00' data-self={true}>
      Sint ex sint laborum reprehenderit. Deserunt cupidatat nulla incididunt fugiat officia officia nulla elit
      adipisicing aliquip exercitation.
    </ChatMessage>

    <ChatMessage time='12:00' data-self={true}>
      Sint ex sint laborum reprehenderit. Deserunt cupidatat nulla incididunt fugiat officia officia nulla elit
      adipisicing aliquip exercitation.
    </ChatMessage>
  </Container>
)
