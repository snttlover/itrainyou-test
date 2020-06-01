import React from 'react'
import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
// @ts-ignore
import placeholder from './images/placeholder.png'
import { MediaRange } from "@/application/lib/responsive/media"
import { useStore } from "effector-react"
import { $pageProfile } from "@/application/pages/dashboard/profile/profile-page.model"

const Container = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  
  ${MediaRange.lessThan(`mobile`)`
    font-size: 60px;
    line-height: 60px;
  `}
`

const Age = styled.div`
  margin-left: 143px;
  font-size: 20px;
  line-height: 26px;
  color: #9AA0A6;
  
  ${MediaRange.lessThan(`mobile`)`
    margin-left: 30px;
  `}
`

const Name = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  margin-left: 16px;
  
  
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 26px;
    margin-left: 12px;
  `}
`

export const ProfileHeader = () => {
  const profile = useStore($pageProfile)
  return (
    <Container>
      <StyledAvatar src={placeholder} />
      <Name>{profile?.first_name}<br />{profile?.last_name}</Name>
      <Age>{profile.age} года</Age>
    </Container>
  )
}
