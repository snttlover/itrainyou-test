import React from "react"
import styled from "styled-components"
import { Icon, IconName } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"
import Link from "next/link"
import { useRouter } from "next/router"

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
  &.selected {
    background: #9ba9b4;
  }
  ${MediaRange.lessThan(`tablet`)`
    &.selected {
      background: transparent;
    }
  `}
  &:last-child {
    margin-bottom: 0;
  }
  ${MediaRange.lessThan(`tablet`)`
    margin-bottom: 36px;
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

type MenuItemTypes = {
  icon: IconName
  link: string
  children: React.ReactChild
  disabled?: boolean
}

export const DashboardMenuItem = (props: MenuItemTypes) => {
  const router = useRouter()

  let className = ``
  if (router.pathname === props.link) {
    className += `selected`
  }

  return (
    <Link passHref href={props.link}>
      <StyledMenuItem disabled={props.disabled} className={className}>
        <MenuItemIcon name={props.icon} />
        <Label>{props.children}</Label>
      </StyledMenuItem>
    </Link>
  )
}
