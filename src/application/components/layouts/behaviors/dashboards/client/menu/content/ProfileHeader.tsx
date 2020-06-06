import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
// @ts-ignore
import profilePlaceholder from "@/application/pages/landing/content/top-bar/mobile-menu/images/profile-placeholder.png"
import { MediaRange } from "@/application/lib/responsive/media"

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

const StyledAvatar = styled(Avatar).attrs({ src: profilePlaceholder })`
  width: 120px;
  height: 120px;
  ${MediaRange.lessThan("mobile")`
    width: 40px;
    height: 40px;
  `}
`

export const ProfileHeader = ({ ...props }) => (
  <StyledHeader {...props}>
    <Name>Bessie Williamson</Name>
    <StyledAvatar />
  </StyledHeader>
)
