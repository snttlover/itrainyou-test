import { Spinner } from "@/components/spinner/Spinner"
import { Tab, Tabs } from "@/components/tabs/Tabs"
import { GetBannedClientsResponse } from "@/lib/api/restriction/get-banned-clients"
import { MediaRange } from "@/lib/responsive/media"
import {
  $bannedClients,
  $isLoading,
  $restrictedClients,
  banClientFx,
  BlockedPageGate,
  restrictClientFx,
  unbanClientFx,
  unrestrictClientFx,
} from "@/pages/coach/blocked/blocked.model"
import { BlockedClient } from "@/pages/coach/blocked/BlockedClient"
import { useEvent, useGate, useStore } from "effector-react/ssr"
import React, { useState } from "react"
import styled from "styled-components"

export const BlockedClients = () => {
  useGate(BlockedPageGate)
  const [tab, changeTab] = useState("session")
  const isLoading = useStore($isLoading)

  const bannedClients = useStore($bannedClients)
  const restrictedClients = useStore($restrictedClients)

  const ban = useEvent(banClientFx)
  const unban = useEvent(unbanClientFx)
  const restrict = useEvent(restrictClientFx)
  const unrestrict = useEvent(unrestrictClientFx)

  return (
    <Container>
      <Tabs value={tab} onChange={changeTab}>
        <Tab value='session'>до покупки сессии</Tab>
        <Tab value='forever'>навсегда</Tab>
      </Tabs>
      <Content>
        {tab === "session" && (
          <>
            {restrictedClients.length !== 0 && (
              <Description>Эти клиенты заблокированы у вас до тех пор, пока они не купят сессию</Description>
            )}
            <BlockedClientsList clients={restrictedClients} ban={restrict} unban={unrestrict} />
          </>
        )}
        {tab === "forever" && <BlockedClientsList clients={bannedClients} ban={ban} unban={unban} />}
        {isLoading && <Spinner />}
      </Content>
    </Container>
  )
}

type BlockedClientsListProps = {
  clients: (GetBannedClientsResponse & { isBanned: boolean })[]
  ban: (id: number) => void
  unban: (id: number) => void
}

const BlockedClientsList = ({ clients, ban, unban }: BlockedClientsListProps) => (
  <>
    {clients.length === 0 && <Placeholder>Вы никого не банили</Placeholder>}
    {clients.map(client => (
      <BlockedClient
        key={client.id}
        avatar={client.avatar}
        name={`${client.firstName} ${client.lastName}`}
        isBlocked={client.isBanned}
        onActionClick={() => (client.isBanned ? unban(client.id) : ban(client.id))}
      />
    ))}
  </>
)

const Container = styled.div`
  margin-top: 36px;
  max-width: 860px;
  min-height: 300px;
  background-color: #fff;
  border-radius: 0 0 2px 2px;

  ${MediaRange.lessThan("tablet")`
    margin: 40px auto;
  `}

  ${MediaRange.lessThan("mobile")`
    margin: 24px -8px;
  `}
`

const Content = styled.div`
  padding: 16px;
`

const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  margin: 0 16px;
`

const Placeholder = styled.div`
  margin-top: 80px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #9aa0a6;
`
