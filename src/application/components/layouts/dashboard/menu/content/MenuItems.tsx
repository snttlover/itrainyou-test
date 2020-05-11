import styled from "styled-components"
import React from "react"
import {MenuItem} from "@/application/components/layouts/dashboard/menu/content/MenuItem"
import { MediaRange } from "@/application/lib/responsive/media"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-self: flex-end;
  margin-right: 70px;
  ${MediaRange.greaterThan('mobile')`
     margin-top: 53px;
     align-self: flex-start;
     margin-left: 63px;
  `}
  ${MediaRange.greaterThan('tablet')`
     margin-top: 36px;
     margin-left: 0px;
     margin-right: 0px;
  `}
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
