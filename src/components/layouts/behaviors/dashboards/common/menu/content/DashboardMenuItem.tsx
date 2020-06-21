import React, { SyntheticEvent } from "react"
import styled from "styled-components"
import { Icon, IconName } from "@/components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"
import Link from "next/link"
import { useRouter } from "next/router"
import { changeBlueLayoutMobileMenuVisibility } from "@/components/layouts/behaviors/dashboards/client/menu/blue-layout.mobile-menu"
import { route } from "next/dist/next-server/server/router"

const MenuItemIcon = styled(Icon).attrs(props => ({
  name: props.name,
}))`
  fill: #fff;
  width: 16px;
  height: 16px;

  ${MediaRange.lessThan(`tablet`)`
    width: 32px;
    height: 32px;
  `}

  ${MediaRange.lessThan(`mobile`)`
    width: 24px;
    height: 24px;
  `}
`

const StyledMenuItem = styled.a<{ disabled?: boolean }>`
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
  ${MediaRange.lessThan(`tablet`)`
    margin-bottom: 36px;
  `}
  &[data-selected="true"] {
    background: #9ba9b4;
  }
  ${MediaRange.lessThan(`tablet`)`
    &[data-selected="true"] {
      background: transparent;
    }
  `}
`

const Label = styled.div`
  color: #ffffff;
  margin-left: 8px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;

  ${MediaRange.lessThan(`tablet`)`
    font-size: 20px;
     line-height: 26px;
     margin-left: 16px;
  `}

  ${MediaRange.lessThan("mobile")`
    font-size: 16px;
    line-height: 22px; 
  `}
`

const prepareLink = (value: string) =>  value.replace(/\/$/g, ``) + `/`

type MenuItemTypes = {
  icon: IconName
  link: string
  children: React.ReactChild
  disabled?: boolean
}

export const DashboardMenuItem = (props: MenuItemTypes) => {
  const router = useRouter()

  const clickHandler = (e: SyntheticEvent) => {
    if (props.disabled) {
      e.preventDefault()
    } else {
      changeBlueLayoutMobileMenuVisibility(false)
    }
  }

  const routerPath = prepareLink(router.asPath)
  const currentLink = prepareLink(props.link)
  const isSelectedLink = routerPath === currentLink

  return (
    <Link passHref href={props.link}>
      <StyledMenuItem onClick={clickHandler} disabled={props.disabled} data-selected={isSelectedLink}>
        <MenuItemIcon name={props.icon} />
        <Label>{props.children}</Label>
      </StyledMenuItem>
    </Link>
  )
}
