import { ClientDashboardLayout } from "@/components/layouts/behaviors/dashboards/client/ClientDashboardLayout"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { Tab, Tabs } from "@/components/tabs/Tabs"
import { MediaRange } from "@/lib/responsive/media"
import { ConfirmationGate } from "@/pages/client/wallet/confirmation.model"
import { WalletHistoryTab } from "@/pages/client/wallet/history/WalletHistoryTab"
import { CardsTabGate } from "./cards/cards.model"
import { FundsUpDialog } from "./funds-up-dialog/FundsUpDialog"
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

export const ClientWalletPage = () => {
  useGate(InfoTabGate)
  useGate(CardsTabGate)
  useGate(ConfirmationGate)
  const [tab, changeTab] = useState("wallet")

  return (
    <ClientDashboardLayout>
      <ContentContainer>
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
        </WalletContainer>
        <FundsUpDialog />
      </ContentContainer>
    </ClientDashboardLayout>
  )
}
