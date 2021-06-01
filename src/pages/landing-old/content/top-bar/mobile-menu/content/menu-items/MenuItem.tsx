import styled from "styled-components"
import * as React from "react"

const Icon = styled.div`
  width: 24px;
  height: 24px;
  background: #daebf7;
  border-radius: 50%;
  margin-right: 8px;
`

const Text = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`

const StyledMenuItem = styled.div`
  display: flex;
  padding-top: 23px;
  padding-bottom: 12px;
  width: calc(100% + 40px);
  margin-left: -20px;
  padding-left: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid #daebf7;
  }
`

type MenuItemTypes = {
  children: React.ReactNode
}

export const MenuItem = (props: MenuItemTypes) => (
  <StyledMenuItem>
    <Icon />
    <Text>{props.children}</Text>
  </StyledMenuItem>
)
