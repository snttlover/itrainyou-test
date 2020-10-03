import { Avatar } from "#/components/avatar/Avatar"
import { Icon } from "#/components/icon/Icon"
import { createInfinityScroll } from "#/feature/pagination"
import { clientCoachesPagination } from "#/pages/coach/client/client-page.model"
import { SessionsStats } from "#/pages/coach/client/components/SessionsStats"
import { useList, useStore } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "#/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
  position: relative;
  max-width: 600px;

  ${MediaRange.lessThan(`mobile`)`
    padding-right: 0;
    padding-top: 100px;
    margin-top: 16px;
  `}
`

const Coaches = styled.div`
  max-width: 600px;
  width: 100%;
  border-radius: 2px;
  background: #fff;
  padding: 24px;
  min-height: 350px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #424242;
  margin-bottom: 23px;

  ${MediaRange.lessThan(`mobile`)`
     padding-top: 30px;
     font-size: 16px;
     line-height: 26px;
  `}
`

const CoachContainer = styled.div`
  display: flex;
  align-items: center;
`

const CoachAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  min-height: 40px;
  min-width: 40px;
  margin-right: 4px;
`

const TopCoachArrow = styled(Icon).attrs({ name: "top-coach" })`
  fill: #e8c268;
  width: 16px;
  margin-left: 8px;
  margin-right: 4px;
`

const Name = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #424242;
  margin-left: 4px;
`

const EmptyPlaceholder = styled.div`
  margin-top: 100px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #9aa0a6;
`

export const CoachesList = () => {
  const InfinityScroll = createInfinityScroll(clientCoachesPagination)
  const listIsEmpty = useStore(clientCoachesPagination.data.$listIsEmpty)

  const coachList = useList(clientCoachesPagination.data.$list, coach => {
    return (
      <CoachContainer>
        <CoachAvatar src={coach.avatar} />
        {coach.isTopCoach && <TopCoachArrow />}
        <Name>
          {coach.firstName} {coach.lastName}
        </Name>
      </CoachContainer>
    )
  })

  return (
    <Container>
      <SessionsStats />
      <Coaches>
        <Title>Коучи, с которыми занимался клиент</Title>
        <InfinityScroll>{coachList}</InfinityScroll>
        {listIsEmpty && <EmptyPlaceholder>Клиент пока не занимался с коучами</EmptyPlaceholder>}
      </Coaches>
    </Container>
  )
}
