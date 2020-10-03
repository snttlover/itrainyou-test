import { MediaRange } from "#/lib/responsive/media"
import { TransactionsList } from "./transactions-list/TransactionsList"
import React from "react"
import styled from "styled-components"

const WalletHistoryContainer = styled.div`
  padding: 24px;

  ${MediaRange.lessThan("mobile")`
    padding: 8px;
  `}
`

export const WalletHistoryTab = () => (
  <WalletHistoryContainer>
    <TransactionsList />
  </WalletHistoryContainer>
)
