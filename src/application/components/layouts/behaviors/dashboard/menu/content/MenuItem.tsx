import React from "react"
import styled from "styled-components"
import { Icon, IconName } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"
import Link from "next/link"

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
  ${MediaRange.greaterThan('tablet')`
    width: 16px;
    height: 16px;
  `}
`

const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  ${MediaRange.greaterThan('tablet')`
     width: 100%;
     margin-bottom: 15px;
     padding: 8px 24px;
  `}
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
  
  ${MediaRange.greaterThan('tablet')`  
     font-style: normal;
     font-weight: normal;
     font-size: 14px;
     line-height: 18px;
     white-space: nowrap;
  `}
`

type MenuItemTypes = {
  icon: IconName,
  link?: string,
  children: React.ReactChild
}

export const MenuItem = (props: MenuItemTypes) => (
  <Link href={props.link || `/search`}>
    <StyledMenuItem>
      <>
        <MenuItemIcon name={props.icon} />
        <Label>
          {props.children}
        </Label>
      </>
    </StyledMenuItem>
  </Link>
)
