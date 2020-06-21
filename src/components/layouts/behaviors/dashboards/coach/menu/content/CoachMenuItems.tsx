import { $coachAccess } from "@/feature/user/user.model"
import { useStore } from "effector-react/ssr"
import styled from "styled-components"
import React from "react"
import { DashboardMenuItem } from "@/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuItem"
import { MediaRange } from "@/lib/responsive/media"

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
  border-top: 1px solid rgb(177, 134, 203);
  margin: 0 8px 21px 12px;

  ${MediaRange.lessThan(`mobile`)`
    margin-left: 0;
    margin-right: 0;
    margin-top: -20px;
    width: 100%;
  `}
`

export const CoachMenuItems = () => {
  const isApproved = useStore($coachAccess).isApproved
  return (
    <ItemsWrapper>
      <DashboardMenuItem link='/coach/' icon='home'>
        Главная страница
      </DashboardMenuItem>
      <DashboardMenuItem disabled={isApproved} link='/coach/clients/' icon='my-coaches'>
        Мои клиенты
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/coach/now' icon='hand'>
      Здесь и сейчас
    </DashboardMenuItem>
    <DashboardMenuItem link='/coach/group-sessions' icon='user'>
      Групповые сессии
    </DashboardMenuItem>*/}
      <DashboardMenuItem disabled={isApproved} link='/coach/wallet/' icon='my-purse'>
        Кошелек
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/coach/calendar' icon='calendar'>
      Календарь
    </DashboardMenuItem>*/}
      <DashboardMenuItem link='/coach/settings/' icon='settings'>
        Настройки
      </DashboardMenuItem>
      <DashboardMenuItem disabled={isApproved} link='/coach/support/' icon='help'>
        Поддержка
      </DashboardMenuItem>
      <Delimiter />
      <DashboardMenuItem disabled={isApproved} link='/coach/schedule/' icon='none'>
        Расписание
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/coach/supervisor' icon='star-with-user'>
      Супервизор
    </DashboardMenuItem>*/}
      <DashboardMenuItem disabled={isApproved} link='/coach/blocked/' icon='calendar-with-clock'>
        Заблокированные
      </DashboardMenuItem>
    </ItemsWrapper>
  )
}
