import { $coachAccess } from "@/feature/user/user.model"
import { routeNames } from "@/pages/route-names"
import { useStore } from "effector-react"
import styled from "styled-components"
import * as React from "react"
import { DashboardMenuItem } from "@/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuItem"
import { MediaRange } from "@/lib/responsive/media"
import { clientChatsSocket, coachChatsSocket } from "@/feature/socket/chats-socket"

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

const Badge= styled.div`
  margin-left: 6px;
  background: #FF6B00;
  border-radius: 50%;
  width: 20px;
  color: #FFFFFF;
  text-align: center;
  line-height: 20px;
  font-size: 10px;
`

export const CoachMenuItems = () => {
  const chatsCount = useStore(coachChatsSocket.data.$chatsCount)
  return (
    <ItemsWrapper>
      <DashboardMenuItem link={routeNames.coach()} icon='home'>
        Главная страница
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.coachClients()} icon='my-coaches'>
        Мои клиенты {chatsCount ? <Badge>{chatsCount}</Badge> : ""}
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/coach/now' icon='hand'>
      Здесь и сейчас
    </DashboardMenuItem>
    <DashboardMenuItem link='/coach/group-sessions' icon='user'>
      Групповые сессии
    </DashboardMenuItem>*/}
      {/*<DashboardMenuItem link={routeNames.coachWallet()} icon='my-purse'>
        Кошелек
      </DashboardMenuItem>/*}
      {/*<DashboardMenuItem link='/coach/calendar' icon='calendar'>
      Календарь
    </DashboardMenuItem>*/}
      <DashboardMenuItem link={routeNames.coachSettings()} icon='settings'>
        Настройки
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.coachSupport()} icon='help'>
        Поддержка
      </DashboardMenuItem>
      <Delimiter />
      <DashboardMenuItem link={routeNames.coachSchedule()} icon='calendar-with-clock'>
        Расписание
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/coach/supervisor' icon='star-with-user'>
      Супервизор
    </DashboardMenuItem>*/}
      <DashboardMenuItem link={routeNames.coachBlocked()} icon='none'>
        Заблокированные
      </DashboardMenuItem>
    </ItemsWrapper>
  )
}
