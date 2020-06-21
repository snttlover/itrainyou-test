import * as React from "react"
import styled from "styled-components"
import { MenuItem } from "./MenuItem"
import menu from "./menu-items"

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const MenuItems = () => (
  <List>
    {/*menu.map((item, i) => (
      <DashboardMenuItem key={i}>{item.text}</DashboardMenuItem>
    ))*/}
  </List>
)
