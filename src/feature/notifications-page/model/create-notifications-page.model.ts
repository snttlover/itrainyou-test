import { createPagination } from "@/feature/pagination"
import { GetNotificationsQuery, Notifications } from "@/lib/api/client/get-notifications"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { date } from "@/lib/formatting/date"
import { createEvent, forward } from "effector-root"

type CreateNotificationsPageModelConfig = {
  fetchNotifications: (params: GetNotificationsQuery) => Promise<Pagination<Notifications>>
}

export const createNotificationsPageModel = (config: CreateNotificationsPageModelConfig) => {
  const mounted = createEvent()
  const reset = createEvent()

  const pagination = createPagination({
    fetchMethod: config.fetchNotifications,
  })

  const $notifications = pagination.data.$list.map(notifications => notifications.map(notification => {

    const day = date(notification.creationDatetime)
    let notificationTime = day.format("DD.MM.YYYY")

    if (day.isAfter(date().subtract(1, "day").startOf("day"))) {
      notificationTime = "вчера"
    }

    if (day.isAfter(date().startOf("day"))) {
      notificationTime = "сегодня"
    }

    return {
      notification,
      time: notificationTime
    }
  }))

  forward({
    from: reset,
    to: pagination.methods.reset
  })

  forward({
    from: mounted,
    to: pagination.methods.loadMore
  })

  return {
    data: {
      $notifications
    },
    modules: {
      pagination,
    },
    methods: {
      mounted,
      reset
    }
  }
}
