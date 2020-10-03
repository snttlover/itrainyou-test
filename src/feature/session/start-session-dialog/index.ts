import { createStartSessionDialogModel } from "#/feature/session/start-session-dialog/create-start-session-dialog.model"
import { clientChatsSocket, coachChatsSocket } from "#/feature/socket/chats-socket"
import { clientCall, coachCall } from "#/components/layouts/behaviors/dashboards/call/create-session-call.model"
import { createStartSessionDialog } from "#/feature/session/start-session-dialog/StartSessionDialog"

export const coachSessionStartedDialog = createStartSessionDialogModel({
  socket: coachChatsSocket,
  type: "coach",
  sessionCallModule: coachCall,
})

export const CoachStartedSessionDialog = createStartSessionDialog(coachSessionStartedDialog)

export const clientSessionStartedDialog = createStartSessionDialogModel({
  socket: clientChatsSocket,
  type: "client",
  sessionCallModule: clientCall,
})

export const ClientStartedSessionDialog = createStartSessionDialog(clientSessionStartedDialog)
