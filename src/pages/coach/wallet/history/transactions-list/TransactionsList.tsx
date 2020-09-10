import styled from "styled-components"
import { Transaction } from "./Transaction"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useGate, useList, useStore } from "effector-react/ssr"
import { Loader } from "@/components/spinner/Spinner"
import SimpleBar from "simplebar-react"
import InfiniteScroll from "react-infinite-scroll-component"
import React from "react"
import {
  $isHasMoreProfileSessions,
  $transactionsList,
  $transactions,
  loadMoreTransactions,
  loadTransactionsFx,
  WalletHistoryPageGate,
} from "../history.model"

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  background: #fff;
  border-radius: 2px;
  margin-top: 14px;
  padding: 11px 20px;
  margin-bottom: 30px;

  ${MediaRange.lessThan(`mobile`)`
    margin-top: 16px;
  `}
`

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  text-align: center;
  margin-bottom: 10px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 12px;
    line-height: 16px;
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

const SessionsEmpty = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  /* identical to box height, or 130% */

  text-align: center;

  /* средне-серый */

  color: #9aa0a6;
`

export const TransactionsList = () => {
  useGate(WalletHistoryPageGate)
  const hasMore = useStore($isHasMoreProfileSessions)
  const sessions = useStore($transactions)
  const loadMore = useEvent(loadMoreTransactions)

  const pending = useStore(loadTransactionsFx.pending)

  return (
    <Container>
      <ListContainer>
        {sessions.length === 0 && !pending && <SessionsEmpty>Пока ни один коуч не ответил на заявку</SessionsEmpty>}
        <InfiniteScroll
          loader={<Loader />}
          next={loadMore as any}
          scrollableTarget='page-wrapper'
          style={{ overflow: `hidden` }}
          hasMore={hasMore}
          dataLength={sessions.length}
        >
          <ItemsContainer>
            <StyledSimpleBar>
              <Items>
                {useList($transactionsList, session => (
                  <Transaction data={session} />
                ))}
              </Items>
            </StyledSimpleBar>
          </ItemsContainer>
        </InfiniteScroll>
      </ListContainer>
    </Container>
  )
}
