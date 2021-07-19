import React from "react"
import styled from "styled-components"
import { ChatSupportMessage } from "@/feature/chat/modules/chat-messages"
import { Avatar } from "@/old-components/avatar/Avatar"

export const SupportMessageSwitcher = (props: ChatSupportMessage) => {
  return (
    <SupportMessageContainer>
      {props.ticketStatus === "LOOKING_FOR_SUPPORT_AGENT" && <Text>Ищем свободного агента поддержки</Text>}
      {props.ticketStatus === "PROBLEM_SOLVED" && <Text>Ваш вопрос был решен</Text>}
      {props.ticketStatus === "SUPPORT_AGENT_FOUND" && <SupportFound {...props} />}
    </SupportMessageContainer>
  )
}

const SupportMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`

const Text = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;
`

const SupportFound = (props: ChatSupportMessage) => {
  return (
    <>
      <StyledAvatar src={props.userAvatar} />
      <Name>{props.userName}</Name>
      <Text>поможет решить ваш вопрос</Text>
    </>
  )
}

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`

const Name = styled.div`
  margin-right: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  white-space: nowrap;
`
