import { createPagination } from "@/feature/pagination"
import { GetCoachSessionRequestsQuery, SessionRequest } from "@/lib/api/coach/get-sessions-requests"
import { combine, createEvent, forward, Store } from "effector-root"
import { date } from "@/lib/formatting/date"
import { Pagination } from "@/lib/api/interfaces/utils.interface"

type CreateSessionHistoryModuleConfig = {
  type: "client" | "coach"
  $sessionId: Store<number>
  fetchHistory: (params: GetCoachSessionRequestsQuery) => Promise<Pagination<SessionRequest>>
}

export const createSessionHistoryModule = (config: CreateSessionHistoryModuleConfig) => {
  const reset = createEvent()
  const load = createEvent<any>()

  const pagination = createPagination<SessionRequest>({
    fetchMethod: config.fetchHistory,
    $query: combine(config.$sessionId, session => ({ session })),
  })

  forward({
    from: load,
    to: pagination.methods.loadMore,
  })

  forward({
    from: reset,
    to: pagination.methods.reset,
  })

  const $sessions = pagination.data.$list.map(sessions =>
    sessions.map(session => ({
      id: session.id,
      text: getRequestText(session),
      date: date(session.resultDatetime || session.creationDatetime).format("DD.MM.YY HH:mm"),
    }))
  )

  return {
    modules: {
      pagination,
    },
    data: {
      $sessions,
    },
    methods: {
      load,
      reset,
    },
  }
}

const getRequestText = (req: SessionRequest) => {
  if (req.type === "BOOK" && req.status === "AWAITING") {
    return `Клиент отправил запрос на сессию ${date(req.session.startDatetime).format("DD MMM HH:mm YYYYг")}`
  }

  if (req.type === "BOOK" && req.status === "APPROVED") {
    return `Коуч подтвердил сессию на ${date(req.session.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "BOOK" && req.status === "CANCELLED") {
    return `Клиент отменил запрос на сессию  ${date(req.session.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "BOOK" && req.status === "DENIED") {
    return `Коуч не подтвердил сессию на ${date(req.session.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "RESCHEDULE" && req.status === "AWAITING") {
    return `Клиент запросил перенос сессии на  ${date(req.rescheduleSession?.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "RESCHEDULE" && req.status === "CANCELLED") {
    return `Клиент отменил перенос на ${date(req.rescheduleSession?.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "RESCHEDULE" && req.status === "DENIED") {
    return `Коуч не подтвердил перенос на ${date(req.rescheduleSession?.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "RESCHEDULE" && req.status === "APPROVED") {
    return `Коуч подтвердил перенос на ${date(req.rescheduleSession?.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "CANCEL" && req.status === "AWAITING") {
    return "Клиент запросил отмену сессии"
  }

  if (req.type === "CANCEL" && req.status === "CANCELLED") {
    return `Клиент отменил запрос на отмену сессии на ${date(req.session.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "CANCEL" && req.status === "DENIED") {
    return `Коуч не подтвердил отмену сессии на ${date(req.session.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "CANCEL" && req.status === "APPROVED") {
    return `Коуч подтвердил отмену сессии на ${date(req.session.startDatetime).format("DD MMMM HH:mm YYYYг")}`
  }

  if (req.type === "CANCEL" && req.status === "AUTOMATICALLY_APPROVED") {
    return "Клиент отменил сессию"
  }

  if (req.type === "CONFIRMATION_COMPLETION" && req.status === "AWAITING") {
    return "Ожидается подтверждение завершения сессии у Клиента "
  }

  if (req.type === "CONFIRMATION_COMPLETION" && req.status === "APPROVED") {
    return "Клиент подтвердил, что сессия успешно завершилась"
  }

  if (req.type === "CONFIRMATION_COMPLETION" && req.status === "DENIED") {
    return "Клиент указал, что с сессий возникли проблемы"
  }

  if (req.type === "CANCEL" && req.status === "AUTOMATICALLY_APPROVED") {
    return "Коуч отменил сессию"
  }

  return ""
}
