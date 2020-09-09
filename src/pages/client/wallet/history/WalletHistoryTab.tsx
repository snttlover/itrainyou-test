import { TransactionsList } from "@/pages/client/wallet/history/transactions-list/TransactionsList"
import React from "react"
import styled from "styled-components"

const WalletHistoryContainer = styled.div`
  padding: 24px;
`

export const WalletHistoryTab = () => (
  <WalletHistoryContainer>
    <TransactionsList />
  </WalletHistoryContainer>
)
