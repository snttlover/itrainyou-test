import styled from "styled-components"
import React from "react"
import {MenuItem} from "@/application/components/layouts/dashboard/menu/MenuItem"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuItems = () => (
  <ItemsWrapper>
    <MenuItem icon='close'>Главная страница</MenuItem>
  </ItemsWrapper>
)
