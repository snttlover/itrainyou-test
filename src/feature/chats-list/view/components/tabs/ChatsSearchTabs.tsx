import React from "react"
import styled from "styled-components"
import { Tabs, Tab } from "@/components/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { ChatListTabs } from "@/feature/chats-list/modules/chat-list"
import { Simulate } from "react-dom/test-utils"

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
      {props.showChosen && <StyledTab value='chosen'>Избранные</StyledTab>}
    </StyledTabs>
  )
}

const StyledTabs = styled(Tabs)`
  display: flex;
  margin-top: 36px;
  justify-content: flex-start;
  ${MediaRange.lessThan("mobile")`
    margin-top: 20px;
    justify-content: space-between;
  `}
`

const StyledTab = styled(Tab)`
  padding: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-right: 24px;
  background: transparent;
  flex: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0);

  &[data-active="true"] {
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    background: transparent;
  }
  ${MediaRange.lessThan("mobile")`
    margin-right: 0;
  `}
`
