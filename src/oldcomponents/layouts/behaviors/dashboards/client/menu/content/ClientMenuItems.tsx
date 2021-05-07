import { routeNames } from "@/pages/route-names"
import styled from "styled-components"
import * as React from "react"
import { DashboardMenuItem } from "@/oldcomponents/layouts/behaviors/dashboards/common/menu/content/DashboardMenuItem"
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
  const supportChatsCount = useStore(clientChatsSocket.data.$supportUnreadMessagesCounter)

  return (
    <ItemsWrapper>
      <DashboardMenuItem link={routeNames.client()} icon='home'>
        Главная страница
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.clientChatsList()} icon='my-coaches' badgeNumber={chatsCount}>
        Мои коучи
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.clientSettings()} icon='settings'>
        Настройки
      </DashboardMenuItem>
      <DashboardMenuItem link={routeNames.clientSupport()} icon='help' badgeNumber={supportChatsCount}>
        Поддержка
      </DashboardMenuItem>
    </ItemsWrapper>
  )
}
