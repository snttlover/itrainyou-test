import { createChatsSocket } from "@/feature/socket/chats-socket"
import { createEvent, forward, restore } from "effector-root"
import { DashboardSession } from "@/lib/api/coach/get-dashboard-sessions"
import { createSessionCallModule } from "@/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { formatSessionTime } from "@/feature/chat/view/content/messages/content/system/SystemMessageSwitcher"

type createStartSessionDialogModelConfig = {
  type: "coach" | "client"

  socket: ReturnType<typeof createChatsSocket>
  sessionCallModule: ReturnType<typeof createSessionCallModule>
}

export const createStartSessionDialogModel = (config: createStartSessionDialogModelConfig) => {
  const hideDialog = createEvent()

  const changeSession = createEvent<DashboardSession | null>()
  const $sessionData = restore<null | DashboardSession>(changeSession, null).reset(hideDialog)

  const $dialogVisibility = $sessionData.map(session => !!session)

  const $session = $sessionData.map(session => {

    const user = config.type === "coach" ? session?.clients[0] : session?.coach

    return {
      time: formatSessionTime(session?.startDatetime, session?.endDatetime),
      name: `${user?.firstName} ${user?.lastName}`,
      avatar: user?.avatar || null,
      id: user?.id || 0
    }
  })

  forward({
    from: config.socket.events.onSessionStarted.map(message => message.data),
    to: changeSession,
  })

  return {
    data: {
      $session,
      $dialogVisibility,
    },
    methods: {
      hideDialog,
      connectToSession: config.sessionCallModule.methods.connectToSession,
    },
  }
}
