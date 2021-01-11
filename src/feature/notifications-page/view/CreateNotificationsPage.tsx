import React, { useEffect } from "react"
import { createNotificationsPageModel } from "@/feature/notifications-page/model/create-notifications-page.model"
import { createInfinityScroll } from "@/feature/pagination"
import { useEvent, useList, useStore } from "effector-react"
import { LeftPageContainer } from "@/pages/common/settings/content/LeftPageContainer"
import styled from "styled-components"
import { NotificationSwitcher } from "@/feature/notifications-page/view/content/NotificationSwitcher"
import { MediaRange } from "@/lib/responsive/media"
import { ContentContainer } from "@/components/layouts/ContentContainer"

export const createNotificationsPage = ($module: ReturnType<typeof createNotificationsPageModel>) => {
  const Infinity = createInfinityScroll($module.modules.pagination)
  return () => {
    const mounted = useEvent($module.methods.mounted)
    const destroyed = useEvent($module.methods.reset)
    const empty = useStore($module.modules.pagination.data.$listIsEmpty)

    useEffect(() => {
      mounted()
      return () => destroyed()
    }, [])

    return (
      <ContentContainer>
        <LeftPageContainer>
          <Title>Все уведомления</Title>
          {empty && <NotFound>Нет уведомлений</NotFound>}
          <Infinity>
            {useList($module.data.$notifications, notification => (
              <NotificationSwitcher {...notification} />
            ))}
          </Infinity>
        </LeftPageContainer>
      </ContentContainer>
    )
  }
}

const NotFound = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #9aa0a6;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  color: #424242;
  margin-top: 36px;
  margin-bottom: 24px;
  ${MediaRange.lessThan("mobile")`
    font-size: 20px;
    line-height: 26px;
  `}
`
