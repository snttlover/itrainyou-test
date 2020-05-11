import styled from "styled-components"
import { Avatar } from "@/application/components/avatar/Avatar"
// @ts-ignore
import profilePlaceholder from "@/application/pages/landing/content/top-bar/mobile-menu/images/profile-placeholder.png"

const StyledHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #919BE0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 4px;
  margin-top: 45px;
  max-width: 260px;
  align-self: flex-end;
`

const Name = styled.div`
  flex: 1;
  font-family: Roboto Slab;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  color: #FFFFFF;
  margin-right: 8px;
  display: flex;
  justify-content: flex-end;
`

const StyledAvatar = styled(Avatar).attrs({ src: profilePlaceholder })`
  width: 40px;
  height: 40px;
`

export const ProfileHeader = () => (
  <StyledHeader>
    <Name>
      Bessie Williamson
    </Name>
    <StyledAvatar />
  </StyledHeader>
)
