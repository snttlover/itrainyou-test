import styled from "styled-components"
import React from "react"
import { DashboardMenuItem } from "@/application/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuItem"
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

export const ClientMenuItems = () => (
  <ItemsWrapper>
    <DashboardMenuItem link='/client/' icon='home'>
      Главная страница
    </DashboardMenuItem>
    <DashboardMenuItem link='/client/' icon='my-coaches'>
      Мои коучи
    </DashboardMenuItem>
    {/*<DashboardMenuItem link='/client/' icon='hand'>
      Здесь и сейчас
    </DashboardMenuItem>
    <DashboardMenuItem link='/client/' icon='user'>
      Групповые сессии
    </DashboardMenuItem>*/}
    <DashboardMenuItem link='/client/' icon='my-purse'>
      Кошелек
    </DashboardMenuItem>
    {/*<DashboardMenuItem link='/client/' icon='calendar'>
      Календарь
    </DashboardMenuItem>*/}
    <DashboardMenuItem link='/client/settings' icon='settings'>
      Настройки
    </DashboardMenuItem>
    <DashboardMenuItem link='/client/' icon='help'>
      Поддержка
    </DashboardMenuItem>
  </ItemsWrapper>
)
