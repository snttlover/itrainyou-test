import React from "react"
import {ContentContainer} from "@/components/layouts/ContentContainer"
import { createChatList } from "@/feature/chats-list"
import { coachChatsList } from "@/pages/coach/chats/list/coach-chats-list.module"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"

const ChatsList = createChatList(coachChatsList)

const StyledContentContainer = styled.div`
   ${MediaRange.lessThan(`mobile`)`
     padding: 0;
   `}
`

export const CoachChatListPage = () => (
  <StyledContentContainer>
    <ChatsList />
  </StyledContentContainer>
)
