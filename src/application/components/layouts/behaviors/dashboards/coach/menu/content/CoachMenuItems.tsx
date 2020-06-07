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

  ${MediaRange.lessThan("tablet")`
    margin-top: 53px;
    align-self: flex-start;
    margin-left: 63px;
    margin-right: 70px;
    width: calc(100% - 56px);
  `}
  
  ${MediaRange.lessThan("mobile")`
     margin-top: 25px;
     align-self: flex-end;
     margin-right: 0px;
     min-width: 260px;
  `}
`

const Delimiter = styled.div`
  width: auto;
  border-top: 1px solid rgb(177, 134, 203);;
  margin: 0 8px 21px 12px;

  ${MediaRange.lessThan(`mobile`)`
    margin-left: 0;
    margin-right: 0;
    margin-top: -20px;
    width: 100%;
  `}
`

export const CoachMenuItems = () => (
  <ItemsWrapper>
    <DashboardMenuItem link='/' icon='home'>
      Главная страница
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='my-coaches'>
      Мои клиенты
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='hand'>
      Здесь и сейчас
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='user'>
      Групповые сессии
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='my-purse'>
      Кошелек
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='calendar'>
      Календарь
    </DashboardMenuItem>
    <DashboardMenuItem link='/settings' icon='settings'>
      Настройки
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='help'>
      Поддержка
    </DashboardMenuItem>
    <Delimiter />
    <DashboardMenuItem link='/' icon='none'>
      Расписание
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='star-with-user'>
      Супервизор
    </DashboardMenuItem>
    <DashboardMenuItem link='/' icon='calendar-with-clock'>
      Заблокированные
    </DashboardMenuItem>
  </ItemsWrapper>
)