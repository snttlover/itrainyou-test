import styled from "styled-components"
import { Icon, IconName } from "@/application/components/icon/Icon"

const MenuItemIcon = styled(Icon).attrs((props) => ({
  name: props.name
}))`
  width: 24px;
  height: 24px;
`

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  font-size: 16px;
  line-height: 22px;
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
