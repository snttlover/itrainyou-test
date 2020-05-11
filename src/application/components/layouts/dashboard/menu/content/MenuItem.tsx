import styled from "styled-components"
import { Icon, IconName } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"

const MenuItemIcon = styled(Icon).attrs((props) => ({
  name: props.name
}))`
  width: 24px;
  height: 24px;
  fill: #fff;
  
  ${MediaRange.greaterThan('mobile')`
    width: 36px;
    height: 36px;
  `}
`

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #FFFFFF;
  margin-left: 8px;
  ${MediaRange.greaterThan('mobile')`
     font-size: 20px;
     line-height: 26px;
     margin-left: 16px;
  `}
`

type MenuItemTypes = {
  icon: IconName,
  children: React.ReactChild
}

export const MenuItem = (props: MenuItemTypes) => (
  <StyledMenuItem>
    <MenuItemIcon name={props.icon} />
    <Label>
      {props.children}
    </Label>
  </StyledMenuItem>
)
