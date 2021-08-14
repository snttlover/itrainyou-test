import React from "react"
import styled from "styled-components"
import { Tabs, Tab } from "@/new-components/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { ChatListTabs } from "@/feature/chats-list/modules/chat-list"

type ChatsListTabsProps = {
  value: string
  onChange: (value: ChatListTabs) => void
  find: (payload: void) => void
  showChosen: boolean
}

export const ChatsSearchTabs = (props: ChatsListTabsProps) => {
  const changeTab = (payload: ChatListTabs) => {
    props.onChange(payload)
    props.find()
  }

  return (
    <StyledTabs value={props.value} onChange={changeTab}>
      <StyledTab value='all'>Все</StyledTab>
      <StyledTab value='unread'>Непрочитанные</StyledTab>
    </StyledTabs>
  )
}

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-start;
  padding: 0 16px;
  border-bottom: 1px solid #f4f5f7;
  ${MediaRange.lessThan("mobile")`
    margin-top: 20px;
    justify-content: space-around;
  `}
`

const StyledTab = styled(Tab)``
