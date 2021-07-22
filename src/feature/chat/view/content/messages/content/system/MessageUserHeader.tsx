import { date } from "@/lib/formatting/date"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Avatar } from "@/old-components/avatar/Avatar"
import React from "react"

type UserHeaderProps = {
  showUser: boolean
  name: string
  avatar: string | null
  date?: string
  hideDate?: boolean
  right?: boolean
}

export const MessageUserHeader = (props: UserHeaderProps) => {
  return (
    <StyledUserHeader data-right={props.right}>
      {
        props.showUser && (
          <UserData>
            <StyledAvatar src={props.avatar} />
            <UserHeaderTitle>{props.name}</UserHeaderTitle>
          </UserData>
        )
      }
      { !props.hideDate && <Time>{date(props.date).format("HH:mm")}</Time> }
    </StyledUserHeader>
  )
}

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #9aa0a6;
  
  flex: 1;
  text-align: right;
  ${MediaRange.lessThan("mobile")`  
    font-size: 12px;
    line-height: 16px;
  `}
`

const UserData = styled.div`
  display: flex;
  align-items: flex-end;
`

const StyledUserHeader = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 8px;
  justify-content: space-between;
  &[data-right="true"] {
    justify-content: flex-end;
  }
`

const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`

const UserHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
  ${MediaRange.lessThan("mobile")`
    font-size: 12px;
    line-height: 16px;
  `}
`
