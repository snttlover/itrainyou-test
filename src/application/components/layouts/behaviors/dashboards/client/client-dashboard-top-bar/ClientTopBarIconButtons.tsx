import styled, { css } from "styled-components"
import { Icon } from "@/application/components/icon/Icon"
import Link from "next/link"
import { Burger } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/Burger"
import { Avatar, AvatarPlaceholder } from "@/application/components/avatar/Avatar"
import { MediaRange } from "@/application/lib/responsive/media"
import { CoachTooltip } from "@/application/components/layouts/behaviors/dashboards/coach/top-bar/coach-tooltip/CoachTooltip"

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconStyles = css`
  cursor: pointer;
  fill: #4858cc;
  width: 28px;
  height: 28px;
  @media screen and (max-width: 768px) {
    fill: #fff;
    width: 36px;
    height: 36px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 16px;
    width: 24px;
    height: 24px;
  }
`

const Notification = styled(Icon).attrs({ name: `notification` })`
  margin-left: 36px;
  ${IconStyles}
`

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-left: 36px;
  cursor: pointer;
  
  @media screen and (max-width: 768px) {
    margin-left: 24px;
    width: 50px;
    height: 50px;
    
    ${AvatarPlaceholder} {
      fill: #fff;
    }
  }
  ${MediaRange.lessThan(`mobile`)`
    width: 35px;
    height: 35px;
  `}
`

const DropdownButton = styled(Icon).attrs({ name: `arrow` })`
  fill: ${props => props.theme.colors.primary};
  margin-left: 37px;
  cursor: pointer;
  height: auto;
  width: 25px;
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`

export const ClientTopBarIconButtons = () => (
  <Wrapper>
    <Notification />
    <Link href={"/client/profile"}>
      <StyledAvatar />
    </Link>
    <Burger />
    <CoachTooltip>
      <DropdownButton />
    </CoachTooltip>
  </Wrapper>
)
