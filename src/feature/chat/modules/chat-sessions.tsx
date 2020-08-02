import { combine, createEvent, createStore, forward, Store } from "effector-root"
import { createChatsSocket } from "@/feature/socket/chats-socket"
import { createPagination } from "@/feature/pagination"
import { ChatSession, GetChatSessionsQuery } from "@/lib/api/chats/clients/get-chat-sessions"
import { date } from "@/lib/formatting/date"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

type CreateChatSessionsModuleConfig = {
  socket: ReturnType<typeof createChatsSocket>
  $chatId: Store<number>
  $withAvatars: Store<boolean>
  fetch: (params: GetChatSessionsQuery) => Promise<Pagination<ChatSession>>
}

type ChatSessionsTabs = "future" | "past" | "soon"

export const createChatSessionsModule = (config: CreateChatSessionsModuleConfig) => {
  const loadSessions = createEvent()
  const reset = createEvent()
  const resetPagination = createEvent()

  const changeTab = createEvent<ChatSessionsTabs>()
  const $tab = createStore<ChatSessionsTabs>(`soon`)
    .on(changeTab, (_, tab) => tab)
    .reset(reset)

  const pagination = createPagination<ChatSession>({
    fetchMethod: config.fetch,
    $query: combine(config.$chatId, $tab, (id, tab) => {
      const query: any = { id }

      if (tab === `past`) {
        query.past = `True`
      }

      if (tab === `future`) {
        query.excludePast = `True`
      }

      return query
    }),
  })

  forward({
    from: resetPagination,
    to: pagination.methods.reset
  })

  const changeTick = createEvent<Date>()
  const $tick = createStore(new Date()).on(changeTick, (_, date) => date)

  const $sessions = combine(pagination.data.$list, $tick, $tab, (sessions, tick, tab) => {
    return sessions.map(s => {
      const session: any = {
        time: date(s.startDatetime).format(`HH:mm`),
        date: date(s.startDatetime).format(`DD MMM YYYYг`),
      }

      if (tab === `soon`) {
        session.tick = date(s.startDatetime)
          .subtract(+tick, `millisecond`)
          .format(`HH.MM.SS`)
      }

      if (date().format(`DDMMYY`) === date(s.startDatetime).format(`DDMMYY`)) {
        session.date = `Сегодня`
      }

      return session
    })
  })

  forward({
    from: loadSessions,
    to: pagination.methods.loadMore,
  })

  forward({
    from: changeTab,
    to: [resetPagination, loadSessions],
  })

  forward({
    from: reset,
    to: resetPagination,
  })

  return {
    data: {
      $tab,
      $sessions,
    },
    methods: {
      changeTab,
      reset,
      loadSessions,
    },
    modules: {
      pagination,
    },
  }
}