import styled from "styled-components"
import React from "react"
import { MenuItem } from "@/application/components/layouts/behaviors/dashboard/menu/content/MenuItem"
import { MediaRange } from "@/application/lib/responsive/media"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 36px;
  margin-left: 0px;
  margin-right: 0px;

  ${MediaRange.lessThan("mobile")`
     margin-top: 25px;
     align-self: flex-end;
     
  `}
  ${MediaRange.lessThan("tablet")`
    margin-top: 53px;
    align-self: flex-start;
    margin-left: 63px;
    margin-right: 70px;
  `}
`

export const MenuItems = () => (
  <ItemsWrapper>
    <MenuItem link='/home' icon='home'>
      Главная страница
    </MenuItem>
    <MenuItem link='/home' icon='my-coaches'>
      Мои коучи
    </MenuItem>
    <MenuItem link='/home' icon='hand'>
      Здесь и сейчас
    </MenuItem>
    <MenuItem link='/home' icon='user'>
      Групповые сессии
    </MenuItem>
    <MenuItem link='/home' icon='my-purse'>
      Кошелек
    </MenuItem>
    <MenuItem link='/home' icon='calendar'>
      Календарь
    </MenuItem>
    <MenuItem link='/settings' icon='settings'>
      Настройки
    </MenuItem>
    <MenuItem link='/home' icon='help'>
      Поддержка
    </MenuItem>
  </ItemsWrapper>
)
