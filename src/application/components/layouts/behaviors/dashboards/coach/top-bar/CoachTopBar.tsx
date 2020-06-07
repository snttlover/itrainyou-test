import styled from "styled-components"
import { LandingPageContainer } from "@/application/pages/landing/common/LandingPageContainer"
import { Icon } from "@/application/components/icon/Icon"
import { Avatar } from "@/application/components/avatar/Avatar"
import { MediaRange } from "@/application/lib/responsive/media"
import { Burger } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/Burger"

const Container = styled.div`
  width: 100%;
  background: #dbdee0;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    background: ${props => props.theme.colors.primary};
  }
`

const StyledContainer = styled(LandingPageContainer)`
  width: 100%;
  align-items: center;
  padding: 15px 40px;
  display: flex;
  justify-content: flex-end;
  ${MediaRange.lessThan(`mobile`)`
    padding: 8px;
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

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-left: 36px;
  cursor: pointer;
  
  ${MediaRange.lessThan(`tablet`)`
    display: none;
  `}
`

const NotificationButton = styled(Icon).attrs({ name: `notification` })`
  width: 27px;
  height: auto;
  fill: ${props => props.theme.colors.primary};
  cursor: pointer;
  ${MediaRange.lessThan(`tablet`)`
    width: 31px;
    fill: #fff;
  `}
  ${MediaRange.lessThan(`mobile`)`
    width: 25px;
  `}
`

export const CoachTopBar = () => (
    <Container>
      <StyledContainer>
        <NotificationButton />
        <StyledAvatar />
        <DropdownButton />
        <Burger />
      </StyledContainer>
    </Container>
)
