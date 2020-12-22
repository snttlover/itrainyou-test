import styled from "styled-components"
import { IndividualSessionItem } from "@/pages/client/profile/content/sessions-list/IndividualSessionItem"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useList, useStore } from "effector-react"
import {
  $isHasMoreProfileSessions,
  $profilePageSessions,
  $ProfileSessions,
  loadMoreProfileSessions,
} from "@/pages/client/profile/profile-page.model"
import { Loader } from "@/components/spinner/Spinner"
import SimpleBar from "simplebar-react"
import InfiniteScroll from "react-infinite-scroll-component"
import React from "react"

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  background: #fff;
  border-radius: 2px;
  margin-top: 44px;
  padding: 11px 20px;
  margin-bottom: 30px;

  ${MediaRange.lessThan(`mobile`)`
    margin-top: 16px;
    padding: 11px 8px;
  `}
`

const Title = styled.div`
    font-family: Roboto Slab;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    color: #424242;
    text-align: left;
    margin-bottom: 10px;
    ${MediaRange.lessThan(`mobile`)`
        font-size: 16px;
        line-height: 26px;
    `}
`

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledSimpleBar = styled(SimpleBar)`
  width: 100%;
  height: 100%;
  & .simplebar-content-wrapper {
    overflow: auto;
  }
  .simplebar-track.simplebar-horizotal {
    height: 7px;
    background: #000;
  }
`

const ItemsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-x: auto;
`
const Items = styled.div`
  position: relative;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: baseline;
  flex-direction: column;
`

export const IndividualSessions = () => {
  const hasMore = useStore($isHasMoreProfileSessions)
  const sessions = useStore($ProfileSessions)
  const loadMore = useEvent(loadMoreProfileSessions)

  return (
    <Container>
      <Title>История сессий</Title>
      <ListContainer>
        <InfiniteScroll
          loader={<Loader />}
          next={loadMore as any}
          scrollableTarget='page-wrapper'
          style={{overflow: `hidden`}}
          hasMore={hasMore}
          dataLength={sessions.length}
        >
          <ItemsContainer>
            <StyledSimpleBar>
              <Items>
                {useList($profilePageSessions, session => (
                  <IndividualSessionItem data={session} />
                ))}
              </Items>
            </StyledSimpleBar>
          </ItemsContainer>
        </InfiniteScroll>
      </ListContainer>
    </Container>
  )
}
