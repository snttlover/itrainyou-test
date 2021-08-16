import React, { useEffect } from "react"
import styled from "styled-components"
import { ChatSessionListItem } from "@/feature/chat/view/content/chat-sessions/ChatSessionListItem"
import { createChatSessionsModule } from "@/feature/chat/modules/chat-sessions"
import { createInfinityScroll } from "@/feature/pagination"
import { useEvent, useList, useStore } from "effector-react"
import { useSplittedStore } from "@/lib/effector/use-split-store"

export const createChatSessions = (sessionsModule: ReturnType<typeof createChatSessionsModule>) => {
  const Pagination = createInfinityScroll(sessionsModule.modules.pagination)

  return () => {
    const isEmpty = useStore(sessionsModule.modules.pagination.data.$listIsEmpty)
    const load = useEvent(sessionsModule.methods.init)
    const reset = useEvent(sessionsModule.methods.reset)

    const sessions = useSplittedStore({
      store: sessionsModule.data.$sessions,
      splitter: session => (session.inFuture ? "future" : "past"),
    })

    useEffect(() => {
      load()
      return () => reset()
    }, [])

    return (
      <Container>
        <Sessions>
          {isEmpty && <Empty>Пока нет сессий</Empty>}
          <Pagination>
            {sessions.keys.map(time => (
              <div key={time}>
                {time === "past" && <Title>Прошли</Title>}
                {sessions.splitted(time).map(session => (
                  <ChatSessionListItem
                    key={session.id}
                    link={session.link}
                    duration={session.duration}
                    date={session.date}
                    time={session.time}
                    inFuture={session.inFuture}
                  />
                ))}
              </div>
            ))}
          </Pagination>
        </Sessions>
      </Container>
    )
  }
}

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #424242;
  margin-top: 24px;
`

const Container = styled.div`
  position: relative;
  background: #fff;
  border-radius: 2px;
  height: 100%;
  flex-basis: 320px;
  width: 320px;
`

const Sessions = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  padding: 0 16px;
`

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  font-size: 16px;
  line-height: 22px;
  color: #9aa0a6;
`
