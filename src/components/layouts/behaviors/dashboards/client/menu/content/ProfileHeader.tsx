import { Link } from "react-router-dom"
import styled from "styled-components"
import { Avatar, AvatarPlaceholder } from "@/components/avatar/Avatar"
import { MediaRange } from "@/lib/responsive/media"
import { Icon } from "@/components/icon/Icon"
import { CoachTooltip } from "@/components/layouts/behaviors/dashboards/coach/top-bar/coach-tooltip/CoachTooltip"
import * as React from "react"

const StyledHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #919be0;

  justify-content: flex-end;
  padding-bottom: 4px;
  margin-top: 40px;
  align-self: flex-end;

  align-items: flex-end;
  max-width: 522px;
  display: none;

  ${MediaRange.lessThan("tablet")`
     display: flex;
  `}

  ${MediaRange.lessThan("mobile")`
     max-width: 260px;
     align-items: center;
  `}
`

const Name = styled.div`
  flex: 1;
  text-align: right;
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  font-family: Roboto Slab;

  padding-bottom: 12px;
  margin-right: 24px;
  font-size: 24px;
  line-height: 26px;
  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 20px;
    margin-right: 8px;
  `}
`

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  ${MediaRange.lessThan("mobile")`
    width: 40px;
    height: 40px;
  `}
  ${AvatarPlaceholder} {
    fill: #fff;
  }
`

const DropdownButton = styled(Icon).attrs({ name: "arrow" })`
  fill: #fff;
  margin-left: 31px;
  margin-right: 31px;
  cursor: pointer;
  height: auto;
  width: 40px;
  align-self: center;
  ${MediaRange.lessThan("mobile")`
    margin-left: 16px;
    margin-right: 16px;
    width: 20px;
  `}
`

const StyledCoachTooltip = styled(CoachTooltip)`
  align-self: center;
`

type ProfileHeaderTypes = {
  firstName?: string
  lastName?: string
  avatar?: string
  profileLink: string
}

export const ProfileHeader = (props: ProfileHeaderTypes) => (
  <StyledHeader {...props}>
    <Name>
      {props.firstName}
      <br /> {props.lastName}
    </Name>
    <Link to={props.profileLink}>
      <StyledAvatar src={props.avatar || null} />
    </Link>
    <StyledCoachTooltip withBack={true}>
      <DropdownButton />
    </StyledCoachTooltip>
  </StyledHeader>
)
