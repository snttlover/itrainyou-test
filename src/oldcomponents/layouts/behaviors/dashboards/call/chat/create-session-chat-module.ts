import { combine, createEvent, restore } from "effector-root"
import { ChatModuleConfig, createChatModule } from "@/feature/chat/modules/chat"
import { forward } from "effector/effector.umd"

export type CreateSessionChatModuleConfig = {
  chatModuleConfig: ChatModuleConfig,
}

export const createSessionChatModule = (config: CreateSessionChatModuleConfig) => {
  const reset = createEvent<void>()

  const chatModule = createChatModule(config.chatModuleConfig)

  const changeVisibility = createEvent<boolean>()
  const toggleVisibility = createEvent()
  const $visibility = restore(changeVisibility, false).on(toggleVisibility, visibility => !visibility)

  const changeChatId = createEvent<number>()
  const $chatId = restore(changeChatId, 0).reset(reset)

  forward({
    from: changeChatId,
    to: chatModule.mounted
  })

  forward({
    from: reset,
    to: chatModule.reset
  })

  const $pending = combine($chatId, chatModule.chat.$loading, (id, loading) => !id || loading)

  return {
    data: {
      $visibility,
      $pending
    },
    methods: {
      changeVisibility,
      toggleVisibility,
      changeChatId,
      reset
    },
    modules: {
      chat: chatModule,
    },
  }
}
