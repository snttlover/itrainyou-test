import { Avatar } from "@/components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import React from "react"
import styled from "styled-components"

type BlockedClientProps = {
  avatar: string
  name: string
  isBlocked?: boolean
  onActionClick: () => void
}

export const BlockedClient: React.FC<BlockedClientProps> = ({ avatar, name, isBlocked, onActionClick }) => {
  return (
    <Container>
      <UserContainer>
        <StyledAvatar src={avatar} />
        <Name>{name}</Name>
      </UserContainer>

      <Action isBlocked={isBlocked} onClick={onActionClick}>
        {isBlocked ? "Разблокировать" : "Заблокировать"}
      </Action>
    </Container>
  )
}

const Container = styled.div`
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: solid 1px #eceff1;
  ${MediaRange.lessThan("mobile")`
    padding: 12px 16px;
  `}
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`

const Name = styled.div`
  margin-left: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;

  ${MediaRange.lessThan("mobile")`
    font-size: 14px;
    line-height: 18px;
  `}
`

const Action = styled.div<{ isBlocked?: boolean }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${({ isBlocked, theme }) => (isBlocked ? theme.colors.primary : "#FF6B00")};
  cursor: pointer;
`
