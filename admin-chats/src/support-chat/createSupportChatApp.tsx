import * as React from "react"
import { createAdminChatContainer } from "../common/createAdminChatContainer"
import { createAdminSupportChatModel } from "./create-admin-support-chat.model"
import { getSupervisorChat } from "@/lib/api/chats/super-admin/get-super-chat"
import { getSupervisorChatMessages } from "@/lib/api/chats/super-admin/get-super-messages"
import { createSupportChat } from "./SupportChat"
import Cookies from "js-cookie"

import { restoreState, runInScope } from "@/scope"
import ReactDOM from "react-dom"
import { TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { clientStarted } from "@/lib/effector"
import { getSupervisorChatImages } from "@/lib/api/chats/super-admin/get-images"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { config } from "@/config"
import { createGlobalStyle } from "styled-components"

export const createSupportChatApp = (chatId: number, token: string, backend: string) => {
  Object.assign(config, {
    BACKEND_URL: `https://${backend}`,
    WS_HOST: `wss://${backend}`,
  })
  Cookies.set(TOKEN_COOKIE_KEY, token)
  const socket = createChatsSocket("support", { chat: chatId })

  const model = createAdminSupportChatModel({
    fetchChat: getSupervisorChat,
    fetchMessages: getSupervisorChatMessages,
    type: "client",
    fetchMaterials: getSupervisorChatImages,
    socket,
  })

  const Chat = createSupportChat(chatId, model)

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
