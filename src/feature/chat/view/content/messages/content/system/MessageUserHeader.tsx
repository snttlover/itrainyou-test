import styled from "styled-components"
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
      {props.showUser && (
        <UserData>
          <UserHeaderTitle>{props.name}</UserHeaderTitle>
        </UserData>
      )}
    </StyledUserHeader>
  )
}

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

const UserHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #424242;
`
