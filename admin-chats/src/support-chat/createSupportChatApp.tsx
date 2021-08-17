import { bootstrapApplication } from "@/app/bootstrap"
import { root } from "effector-root"
import { hydrate } from "effector/fork"
import * as React from "react"
import { createAdminChatContainer } from "../common/createAdminChatContainer"
import { createAdminSupportChatModel } from "./create-admin-support-chat.model"
import { getSupervisorChat } from "@/lib/api/chats/super-admin/get-super-chat"
import { getSupervisorChatMessages } from "@/lib/api/chats/super-admin/get-super-messages"
import { createSupportChat } from "./SupportChat"

import { runInScope } from "@/scope"
import ReactDOM from "react-dom"
import { clientStarted } from "@/lib/effector"
import { getSupervisorChatImages } from "@/lib/api/chats/super-admin/get-images"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { config } from "@/config"
import { createGlobalStyle } from "styled-components"
import { sessionToken } from "@/feature/user/session-token"

export const createSupportChatApp = (chatId: number, token: string, backend: string) => {
  Object.assign(config, {
    BACKEND_URL: `https://${backend}`,
    WS_HOST: `wss://${backend}`,
  })
  sessionToken.set(token)
  const socket = createChatsSocket("support", { chat: chatId })

  const model = createAdminSupportChatModel({
    fetchChat: getSupervisorChat,
    fetchMessages: getSupervisorChatMessages,
    type: "client",
    fetchMaterials: getSupervisorChatImages,
    socket,
  })

  const Chat = createSupportChat(chatId, model)

  bootstrapApplication({
    activeDashboardType: "client",
    token: sessionToken.get(),
    backendUrl: config.BACKEND_URL
  })
  hydrate(root, { values: window.INITIAL_STATE })
  runInScope(clientStarted)

  ReactDOM.render(
    <>
      <Styles />
      <div id='root'>
        <Chat />
      </div>
    </>,
    createAdminChatContainer()
  )
}

const Styles = createGlobalStyle`
  #root {
    color: #424242;
    font-family: Roboto, sans-serif;
    * {
      box-sizing: border-box;
    }
    a {
      text-decoration: none;
    }
    button, a {  
      -webkit-tap-highlight-color:  transparent;
      user-select: none;
    }
  }
`
