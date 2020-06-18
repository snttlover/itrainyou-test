import styled from "styled-components"
import {ChatLink} from "@/application/pages/client/chats/list/container/common/ChatLink"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    min-width: 734px;
`

export const ClientChatsList = () => (
    <Container>
      <ChatLink />
      <ChatLink />
    </Container>
)
