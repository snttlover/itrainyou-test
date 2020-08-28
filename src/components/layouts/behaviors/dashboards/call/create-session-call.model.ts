import { combine, createEvent, restore } from "effector-root"
import { Client } from "@/lib/api/client/clientInfo"
import { VideoTokenData } from "@/lib/api/coach/get-session-video-token"
import { SessionInfo } from "@/lib/api/coach/get-session"

type CreateSessionCallModuleConfig = {
  dashboard: "client" | "coach",
  getConnectDataRequest: (id: number) => Promise<VideoTokenData>,
  getSessionRequest: (id: number) => Promise<SessionInfo>
}

export const createSessionCallModule = (config: CreateSessionCallModuleConfig) => {
  const changeFullScreen = createEvent<boolean>()
  const $fullScreen = restore(changeFullScreen, false)

  const changeMicro = createEvent<boolean>()
  const $micro = restore(changeMicro, true)

  const changeVideo = createEvent<boolean>()
  const $video = restore(changeVideo, true)

  const changeInterlocutor = createEvent<Client | null>()
  const $interlocutorData = restore<Client | null>(changeInterlocutor, null)

  const $transformedInterlocutor = $interlocutorData.map(user =>
    user ? { avatar: user.avatar, name: `${user.firstName} ${user.lastName}` } : null
  )

  const changeInterlocutorVideoStatus = createEvent<boolean>()
  const $interlocutorVideoStatus = restore(changeInterlocutorVideoStatus, false)

  const changeInterlocutorMicrophoneStatus = createEvent<boolean>()
  const $interlocutorMicrophoneStatus = restore(changeInterlocutorMicrophoneStatus, false)

  const $self = combine($micro, $video, $fullScreen, (micro, video, fullscreen) => ({
    micro,
    video,
    fullscreen,
  }))

  const $interlocutor = combine(
    $transformedInterlocutor,
    $interlocutorMicrophoneStatus,
    $interlocutorVideoStatus,
    (info, micro, video) => ({
      info,
      video,
      micro,
    })
  )

  const changeDialogVisibility = createEvent<boolean>()
  const $callsVisibility = restore(changeDialogVisibility, true)

  const connectToSession = createEvent<number>()
  const close = createEvent()

  return {
    data: {
      $callsVisibility,
      $self,
      $interlocutor
    },
    methods: {
      changeFullScreen,
      changeMicro,
      changeVideo,
      connectToSession,
      close,
    },
  }
}
