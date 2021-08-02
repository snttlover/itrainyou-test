import * as React from "react"
import { createAdminChatContainer } from "../common/createAdminChatContainer"
import { createSupervisorChatModel } from "./create-supervisor-chat.model"
import { getSupervisorChat } from "@/lib/api/chats/super-admin/get-super-chat"
import { getSupervisorChatMessages } from "@/lib/api/chats/super-admin/get-super-messages"
import { createSupervisorChat } from "./SupervisorChat"

import { restoreState, runInScope } from "@/scope"
import ReactDOM from "react-dom"
import { clientStarted } from "@/lib/effector"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { config } from "@/config"
import { createGlobalStyle } from "styled-components"
import { sessionToken } from "@/feature/user/session-token"

export const createSupervisorChatApp = (chatId: number, token: string, backend: string) => {
  Object.assign(config, {
    BACKEND_URL: `https://${backend}`,
    WS_HOST: `wss://${backend}`,
  })

  sessionToken.set(token)
  const socket = createChatsSocket("admin", { chat: chatId })

  const model = createSupervisorChatModel({
    fetchChat: getSupervisorChat,
    fetchMessages: getSupervisorChatMessages,
    type: "client",
    socket,
  })

  const Chat = createSupervisorChat(chatId, model)

  restoreState().then(() => {
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
  })
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
