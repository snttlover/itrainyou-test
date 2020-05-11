import styled from "styled-components"
import React from "react"
import {MenuItem} from "@/application/components/layouts/dashboard/menu/content/MenuItem"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-self: flex-end;
  margin-right: 70px;
`

export const MenuItems = () => (
  <ItemsWrapper>
    <MenuItem icon='home'>Главная страница</MenuItem>
    <MenuItem icon='my-coaches'>Мои коучи</MenuItem>
    <MenuItem icon='hand'>Здесь и сейчас</MenuItem>
    <MenuItem icon='user'>Групповые сессии</MenuItem>
    <MenuItem icon='my-purse'>Кошелек</MenuItem>
    <MenuItem icon='calendar'>Календарь</MenuItem>
    <MenuItem icon='settings'>Настройки</MenuItem>
    <MenuItem icon='help'>Поддержка</MenuItem>
  </ItemsWrapper>
)
