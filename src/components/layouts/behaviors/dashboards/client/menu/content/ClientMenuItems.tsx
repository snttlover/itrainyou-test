import { routeNames } from "@/pages/route-names"
import styled from "styled-components"
import * as React from "react"
import { DashboardMenuItem } from "@/components/layouts/behaviors/dashboards/common/menu/content/DashboardMenuItem"
import { MediaRange } from "@/lib/responsive/media"
import { useStore } from "effector-react"
import { clientChatsSocket } from "@/feature/socket/chats-socket"

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

export const ClientMenuItems = () => {
  const chatsCount = useStore(clientChatsSocket.data.$chatsCount)
  return (
    <ItemsWrapper>
      <DashboardMenuItem link={routeNames.client()} icon='home'>
        Главная страница
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.clientChatsList()} icon='my-coaches'>
        Мои коучи {chatsCount ? `+${chatsCount}` : ``}
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/client/' icon='hand'>
      Здесь и сейчас
    </DashboardMenuItem>
    <DashboardMenuItem link='/client/' icon='user'>
      Групповые сессии
    </DashboardMenuItem>*/}
      <DashboardMenuItem link={routeNames.clientWallet()} icon='my-purse'>
        Кошелек
      </DashboardMenuItem>
      {/*<DashboardMenuItem link='/client/' icon='calendar'>
      Календарь
    </DashboardMenuItem>*/}
      <DashboardMenuItem link={routeNames.clientSettings()} icon='settings'>
        Настройки
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.clientSupport()} icon='help'>
        Поддержка
      </DashboardMenuItem>
    </ItemsWrapper>
  )
}
