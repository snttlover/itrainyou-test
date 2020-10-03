import * as React from "react"
import { createAdminChatContainer } from "../common/createAdminChatContainer"
import { createAdminChatSocket } from "../common/createAdminChatSocket"
import { createSupervisorChatModel } from "./create-supervisor-chat.model"
import { getSupervisorChat } from "@/lib/api/chats/super-admin/get-super-chat"
import { getSupervisorChatMessages } from "@/lib/api/chats/super-admin/get-super-messages"
import { createSupervisorChat } from "./SupervisorChat"
import { Provider } from "effector-react/ssr"
import Cookies from "js-cookie"

import { restoreState, runInScope } from "@/scope"
import ReactDOM from "react-dom"
import { TOKEN_COOKIE_KEY } from "@/lib/network/token"
import { clientStarted } from "@/lib/effector"
import { AppStyles } from "@/AppStyles"

export const createSupervisorChatApp = (chatId: number, token: string) => {
  Cookies.set(TOKEN_COOKIE_KEY, token)
  restoreState().then(scope => {
    const socket = createAdminChatSocket(token)

    const model = createSupervisorChatModel({
      fetchChat: getSupervisorChat,
      fetchMessages: getSupervisorChatMessages,
      type: "client",
      socket
    })

    const Chat = createSupervisorChat(chatId, model)

    runInScope(clientStarted)
    ReactDOM.render(
      <Provider value={scope}>
        <AppStyles />
        <Chat />
      </Provider>,
      createAdminChatContainer()
    )
  })
}
