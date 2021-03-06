import React, { SyntheticEvent } from "react"
import styled from "styled-components"
import { Icon, IconName } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import { changeBlueLayoutMobileMenuVisibility } from "@/old-components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"
import { Link, useLocation } from "react-router-dom"
import { useEvent } from "effector-react"

const MenuItemIcon = styled(Icon).attrs(props => ({
  name: props.name,
}))`
  fill: #fff;
  width: 16px;
  height: 16px;

  ${MediaRange.lessThan("tablet")`
    width: 32px;
    height: 32px;
  `}

  ${MediaRange.lessThan("mobile")`
    width: 24px;
    height: 24px;
  `}
`

const Badge = styled.div`
  background: #FF6B00;
  border-radius: 16px;
  height: 24px;
  color: #FFFFFF;
  text-align: center;
  line-height: 22px;
  font-size: 14px;
`

const StyledMenuItem = styled(Link)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
  padding: 8px 24px;
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${MediaRange.lessThan("tablet")`
    margin-bottom: 36px;
  `}
  
  &[data-selected="true"] {
    background: #9ba9b4;
  }
  
  ${MediaRange.lessThan("tablet")`
    &[data-selected="true"] {
      background: transparent;
    }
  `}
`

const Label = styled.div`
  position: relative;
  color: #ffffff;
  margin-left: 8px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${MediaRange.lessThan("tablet")`
    font-size: 20px;
     line-height: 26px;
     margin-left: 16px;
  `}

  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 22px; 
  `}
  
  & > ${Badge} {
    position: absolute;
    right: -40px;
    top: -3px;
    padding: 1px 6px 1px 5px;
    ${MediaRange.lessThan("tablet")`
      top: 1px;
    `}
    ${MediaRange.lessThan("mobile")`
      top: -1px;
    `}
  }
`

const prepareLink = (value: string) => value.replace(/\/$/g, "") + "/"

type MenuItemTypes = {
  icon: IconName
  link: string
  children: React.ReactChild | React.ReactChild[]
  disabled?: boolean
  badgeNumber?: number
}

export const DashboardMenuItem = (props: MenuItemTypes) => {
  const location = useLocation()
  const changeLayoutVisibility = useEvent(changeBlueLayoutMobileMenuVisibility)

  const clickHandler = (e: SyntheticEvent) => {
    if (props.disabled) {
      e.preventDefault()
    } else {
      changeLayoutVisibility(false)
    }
  }

  const routerPath = prepareLink(location.pathname)
  const currentLink = prepareLink(props.link)
  const isSelectedLink = routerPath === currentLink

  return (
    <StyledMenuItem to={props.link} onClick={clickHandler} disabled={props.disabled} data-selected={isSelectedLink}>
      <MenuItemIcon name={props.icon} />
      <Label>{props.children} { !!props.badgeNumber && <Badge>{props.badgeNumber}</Badge> }</Label>
    </StyledMenuItem>
  )
}
