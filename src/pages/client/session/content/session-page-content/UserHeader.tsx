import React from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { Icon } from "@/components/icon/Icon"
import { Button } from "@/components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"

export const UserHeader = () => (
  <Container>
    <UserInfo>
      <StyledAvatar src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' />
      <Info>
        <Name>Иван Иванов</Name>
        <Rating>
          <RatingIcon />
          4,5
        </Rating>
        <SessionsCounter>У вас было 12 занятий с коучем</SessionsCounter>
      </Info>
    </UserInfo>
    <MobileSessionsCounter>
      У вас было 12 занятий с коучем
    </MobileSessionsCounter>
    <Write>Написать</Write>
  </Container>
)

const UserInfo = styled.div`
  display: flex;
  flex: 1;
`

const Container = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 2px;
  display: flex;
  ${MediaRange.lessThan(`mobile`)`
    flex-direction: column;
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-right: 16px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Name = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 26px;
  `}
`

const Rating = styled.div`
  display: flex;
  align-items: center;

  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: ${props => props.theme.colors.primary};
  margin-top: 8px;
  
  ${MediaRange.lessThan(`mobile`)`
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  `}
`

const RatingIcon = styled(Icon).attrs({ name: `star` })`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  fill: ${props => props.theme.colors.primary};
`

const SessionsCounter = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  ${MediaRange.lessThan(`mobile`)`
    display: none;
  `}
`

const MobileSessionsCounter = styled.div`
  display: none;
  ${MediaRange.lessThan(`mobile`)`
     display: flex;
     font-size: 14px;
     line-height: 18px;
     color: #5B6670;
     margin-top: 12px;
  `}
`

const Write = styled(Button)`
  width: 160px;
  align-self: flex-end;
  ${MediaRange.lessThan(`mobile`)`
    align-self: center;
    margin-top: 12px;
  `}
`
