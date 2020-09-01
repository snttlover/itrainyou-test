import React from "react"
import { createNotificationsPageModel } from "@/pages/client/notifications/notifications/model/create-notifications-page.model"
import { createInfinityScroll } from "@/feature/pagination"
import { useList } from "effector-react/ssr"
import { LeftPageContainer } from "@/pages/common/settings/content/LeftPageContainer"
import styled from "styled-components"
import { NotificationSwitcher } from "@/pages/client/notifications/notifications/view/content/NotificationSwitcher"

const createNotificationsPage = ($module: ReturnType<typeof createNotificationsPageModel>) => {
  const Infinity = createInfinityScroll($module.modules.pagination)
  return () => {
    return (
      <LeftPageContainer>
        <Title>Все уведомления</Title>
        <Infinity>
          {useList($module.data.$notifications, notification => (
            <NotificationSwitcher {...notification} />
          ))}
        </Infinity>
      </LeftPageContainer>
    )
  }
}

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  margin-top: 36px;
  margin-bottom: 24px;
`
