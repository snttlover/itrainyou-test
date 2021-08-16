import { combine, createEvent, createStore, forward, Store, restore } from "effector-root"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { createPagination } from "@/feature/pagination"
import { ChatSession, GetChatSessionsQuery } from "@/lib/api/chats/clients/get-chat-sessions"
import { date } from "@/lib/formatting/date"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { ChatId } from "@/lib/api/chats/coach/get-messages"

type CreateChatSessionsModuleConfig = {
  socket: ReturnType<typeof createChatsSocket>
  $chatId: Store<ChatId>
  $withAvatars: Store<boolean>
  chatUserType: "client" | "coach"
  fetch: (params: GetChatSessionsQuery) => Promise<Pagination<ChatSession>>
}

export const createChatSessionsModule = (config: CreateChatSessionsModuleConfig) => {
  const loadSessions = createEvent()
  const reset = createEvent()
  const resetPagination = createEvent()

  const pagination = createPagination<ChatSession>({
    fetchMethod: config.fetch,
    $query: combine(config.$chatId, id => {
      const query: any = { id: +id }
      query.past = "False"
      query.excludePast = "False"

      return query
    }),
  })

  forward({
    from: resetPagination,
    to: pagination.methods.reset,
  })

  const $sessions = combine(pagination.data.$list, sessions => {
    const formatted = sessions.map(s => {
      const session: any = {
        id: s.id,
        link: `/${config.chatUserType}/sessions/${s.id}`,
        time: date(s.startDatetime).format("HH:mm"),
        date: date(s.startDatetime).format("DD MMM YYYYг"),
        startDatetime: date(s.startDatetime),
        duration: s.durationType === "PROMO" ? "PROMO" : `${s.durationType.match(/\d/g)?.join("")} мин`,
        inFuture: date().isBefore(s.startDatetime),
      }

      if (date().format("DDMMYY") === date(s.startDatetime).format("DDMMYY")) {
        session.date = "Сегодня"
      }

      return session
    })

    return formatted
  })

  forward({
    from: loadSessions,
    to: pagination.methods.loadMore,
  })

  const init = createEvent()

  forward({
    from: init,
    to: [resetPagination, loadSessions],
  })

  forward({
    from: reset,
    to: resetPagination,
  })

  return {
    data: {
      $sessions,
    },
    methods: {
      init,
      reset,
      loadSessions,
    },
    modules: {
      pagination,
    },
  }
}

export const changeSessionsMobileVisibility = createEvent<boolean>()
export const $showSessionsOnMobile = restore(changeSessionsMobileVisibility, false)
