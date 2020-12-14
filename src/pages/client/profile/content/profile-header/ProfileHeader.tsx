import * as React from "react"
import styled from "styled-components"
import { Avatar } from "@/components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { useStore } from "effector-react"
import { $pageProfile } from "@/pages/client/profile/profile-page.model"
import { Icon } from "@/components/icon/Icon"
import { Link } from "react-router-dom"
import { routeNames } from "@/pages/route-names"
import { declOfNum } from "@/lib/formatting/numerals"


const Container = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  ${MediaRange.lessThan(`mobile`)`
    padding-left: 8px;
    padding-right: 8px;
    margin-top: 24px;
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;

  ${MediaRange.lessThan(`mobile`)`
    width: 60px;
    height: 60px;
  `}
`

const Age = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #9aa0a6;

    ${MediaRange.lessThan(`tablet`)`
    margin-left: 80px;
  `}
    
  ${MediaRange.lessThan(`mobile`)`
    margin-left: 30px;
    text-align: right;
  `}
`

const Name = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  margin-left: 16px;
  flex-basis: calc(50% - 100px);

  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 26px;
    margin-left: 12px;
    flex-basis: unset;
    flex: 1;
  `}
`

const Edit = styled(Icon).attrs({ name: 'edit' })`
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin-left: 20px;
  fill: ${({ theme }) => theme.colors.primary};
`

export const ProfileHeader = () => {
  const profile = useStore($pageProfile)

  return (
    <Container>
      <StyledAvatar src={profile?.avatar} />
      <Name>
        {profile?.firstName}
        <br />
        {profile?.lastName}
      </Name>
      {!isNaN(profile.age) && <Age>{profile.age} {declOfNum(profile.age,["год", "года", "лет"])}</Age>}
      <Link to={routeNames.clientProfileEdit()}>
        <Edit />
      </Link>
    </Container>
  )
}
