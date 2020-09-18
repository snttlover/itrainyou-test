import { Tab, Tabs } from "@/components/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { ConfirmationGate } from "@/pages/coach/wallet/confirmation.model"
import { WithdrawDialog } from "@/pages/coach/wallet/withdraw-dialog/WithdrawDialog"
import { WalletHistoryTab } from "./history/WalletHistoryTab"
import { CardsTabGate } from "./cards/cards.model"
import { InfoTabGate } from "./info/info.model"
import { useGate } from "effector-react/ssr"
import { WalletsCardsTab } from "./cards/WalletCardsTab"
import { WalletInfoTab } from "./info/WalletInfoTab"
import React, { useState } from "react"
import styled from "styled-components"

const WalletContainer = styled.div`
  margin-top: 36px;
  max-width: 644px;
  background-color: #fff;
  border-radius: 0 0 2px 2px;

  ${MediaRange.lessThan("tablet")`
    margin: 40px auto;
  `}

  ${MediaRange.lessThan("mobile")`
    margin: 24px -8px;
  `}
`

const WalletTabContentContainer = styled.div``

export const Wallet = () => {
  useGate(InfoTabGate)
  useGate(CardsTabGate)
  useGate(ConfirmationGate)
  const [tab, changeTab] = useState("wallet")

  return (
    <WalletContainer>
      <Tabs value={tab} onChange={changeTab}>
        <Tab value='wallet'>кошелек</Tab>
        <Tab value='history'>история</Tab>
        <Tab value='cards'>привязанные карты</Tab>
      </Tabs>
      <WalletTabContentContainer>
        {tab === "wallet" && <WalletInfoTab />}
        {tab === "history" && <WalletHistoryTab />}
        {tab === "cards" && <WalletsCardsTab />}
      </WalletTabContentContainer>
      <WithdrawDialog />
    </WalletContainer>
  )
}
