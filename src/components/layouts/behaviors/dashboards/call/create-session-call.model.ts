import { combine, createEffect, createEvent, forward, guard, restore } from "effector-root"
import { getCoachSessionVideoToken, VideoTokenData } from "@/lib/api/coach/get-session-video-token"
import { getCoachSession, SessionInfo } from "@/lib/api/coach/get-session"
import { Client } from "@/lib/api/client/clientInfo"
import { Client as AgoraClient, Stream } from "agora-rtc-sdk"
import { createSessionCall } from "@/components/layouts/behaviors/dashboards/call/SessionCall"
import { config as appConfig } from "@/config"
import { $isClient } from "@/lib/effector"
import { getClientSessionVideoToken } from "@/lib/api/client/get-session-video-token"
import { getClientSession } from "@/lib/api/client/get-client-session"
import { date } from "@/lib/formatting/date"
import { runInScope } from "@/scope"

type CreateSessionCallModuleConfig = {
  dashboard: "client" | "coach"
  getConnectDataRequest: (id: number) => Promise<VideoTokenData>
  getSessionRequest: (id: number) => Promise<SessionInfo>
}

type Agora = {
  client: null | AgoraClient
  localStream: null | Stream
  remoteStream: null | Stream
}

const agoraHandleFail = (e: any, payload?: any) => {
  console.error(e, payload)
}

let agoraLib: any = null
if (process.env.BUILD_TARGET === "client") {
  agoraLib = require("agora-rtc-sdk")
}

export const createSessionCallModule = (config: CreateSessionCallModuleConfig) => {
  const reset = createEvent()
  const connectToSession = createEvent<number>()

  const changeInterculatorWasConnected = createEvent<boolean>()
  const $interculatorWasConnected = restore(changeInterculatorWasConnected, false).reset(reset)

  const changeInterlocutorVideoStatus = createEvent<boolean>()
  const $interlocutorVideoStatus = restore(changeInterlocutorVideoStatus, true).reset(reset)

  const changeInterlocutorMicrophoneStatus = createEvent<boolean>()
  const $interlocutorMicrophoneStatus = restore(changeInterlocutorMicrophoneStatus, true).reset(reset)

  const changeInterculatorIsConnected = createEvent<boolean>()
  const $interculatorIsConnected = restore(changeInterculatorIsConnected, false).reset(reset)

  const playAgoraFx = createEffect({
    handler: () => {
      if (agoraData.remoteStream) {
        if (agoraData.remoteStream.isPlaying()) {
          agoraData.remoteStream.stop()
        }
        const player = document.getElementById("InterlocutorVideo")
        if (player) {
          player.innerHTML = ""
        }
        agoraData.remoteStream.play("InterlocutorVideo", { fit: "cover" })
      }
      if (agoraData.localStream) {
        if (agoraData.localStream.isPlaying()) {
          agoraData.localStream.stop()
        }
        const player = document.getElementById("MyUserVideo")
        if (player) {
          player.innerHTML = ""
        }
        agoraData.localStream.play("MyUserVideo", { fit: "cover" })
      }
    },
  })
  const play = createEvent()

  forward({
    from: play,
    to: playAgoraFx,
  })

  const changeSessionId = createEvent<number>()
  const $sessionId = restore(changeSessionId, 0).reset(reset)

  const initAgoraFx = createEffect({
    handler: () => {
      if (agoraLib) {
        agoraData.client = agoraLib.createClient({
          mode: "live",
          codec: "h264",
        }) as AgoraClient
        const appId = appConfig.AGORA_ID as string
        agoraData.client.init(appId, () => {}, agoraHandleFail)

        agoraData.client.on("stream-added", e => {
          agoraData.client && agoraData.client.subscribe(e.stream)
        })

        agoraData.client.on("peer-leave", (e) => {
          if (e.uid === agoraData.remoteStream?.getId()) {
            runInScope(changeInterculatorIsConnected, false)
            agoraData.remoteStream = null
            const player = document.getElementById("InterlocutorVideo")
            if (player) {
              player.innerHTML = ""
            }
          }
        })

        agoraData.client.on("mute-audio", () => runInScope(changeInterlocutorMicrophoneStatus, false))
        agoraData.client.on("unmute-audio", () => runInScope(changeInterlocutorMicrophoneStatus,true))
        agoraData.client.on("mute-video", () => runInScope(changeInterlocutorVideoStatus,false))
        agoraData.client.on("unmute-video", () => runInScope(changeInterlocutorVideoStatus, true))

        agoraData.client.on("stream-subscribed", e => {
          agoraData.remoteStream = e.stream
          play()
          agoraData.remoteStream?.on("player-status-change", (event) => {
            runInScope(changeInterlocutorVideoStatus, agoraData.remoteStream?.hasVideo() || false)
            runInScope(changeInterlocutorMicrophoneStatus, agoraData.remoteStream?.hasAudio() || false)
          })
          runInScope(changeInterculatorWasConnected, true)
          runInScope(changeInterculatorIsConnected, true)
        })
      }
    },
  })

  guard({
    source: $isClient,
    filter: $isClient,
    target: initAgoraFx.prepend(() => {}),
  })

  const agoraData: Agora = {
    client: null,
    localStream: null,
    remoteStream: null,
  }

  const agoraConnectFx = createEffect({
    handler: (credentials: VideoTokenData) => {
      if (agoraData.client) {
        agoraData.client.join(
          credentials.token,
          credentials.channelName,
          credentials.userAccount,

          // create streams
          () => {
            agoraData.localStream = agoraLib.createStream({
              streamID: credentials.userAccount,
              audio: true,
              video: true,
              screen: false,
            }) as Stream

            agoraData.localStream.init(() => {
              if (agoraData.localStream) {
                play()
                agoraData.client && agoraData.client.publish(agoraData.localStream, agoraHandleFail)
              }
            })
          },
          agoraHandleFail
        )
      }
    },
  })

  const getTokenDataFx = createEffect({
    handler: config.getConnectDataRequest,
  })

  const getSessionDataFx = createEffect({
    handler: config.getSessionRequest,
  })

  forward({
    from: connectToSession.map(() => {}),
    to: reset,
  })

  const changeCallsVisibility = createEvent<boolean>()
  const $callsVisibility = restore(changeCallsVisibility, false).reset(reset)

  forward({
    from: connectToSession.map(() => true),
    to: changeCallsVisibility,
  })

  forward({
    from: connectToSession,
    to: [changeSessionId, getTokenDataFx, getSessionDataFx],
  })

  const $sessionTokenData = restore<VideoTokenData>(getTokenDataFx.doneData, null).reset(reset)
  const $minutesLeft = $sessionTokenData.map(data => {
    if (!data) {
      return false
    }
    return date(data.sessionTerminationDatetime).diff(date(), "minute") + 1
  })
  const $isCloseToTerminate = combine($sessionTokenData, $minutesLeft, (tokenData, minutes) => {
    if (!tokenData || !minutes) {
      return false
    }
    return minutes <= tokenData.extraTimeMinutes
  })

  forward({
    from: getTokenDataFx.doneData,
    to: agoraConnectFx,
  })

  const changeAgoraMicroFx = createEffect({
    handler: (status: boolean) => {
      if (agoraData.localStream) {
        if (status) {
          agoraData.localStream.unmuteAudio()
        } else {
          agoraData.localStream.muteAudio()
        }
      }
    },
  })

  const changeAgoraVideoFx = createEffect({
    handler: (status: boolean) => {
      if (agoraData.localStream) {
        if (status) {
          agoraData.localStream.unmuteVideo()
        } else {
          agoraData.localStream.muteVideo()
        }
      }
    },
  })

  const leaveAgoraFx = createEffect({
    handler: () => {
      if (agoraData.remoteStream) {
        if (agoraData.client) {
          agoraData.client.unsubscribe(agoraData.remoteStream)
        }
        agoraData.remoteStream.close()
        agoraData.remoteStream = null
      }
      if (agoraData.localStream) {
        if (agoraData.client) {
          agoraData.client.unpublish(agoraData.localStream)
        }
        agoraData.localStream.close()
        agoraData.localStream = null
      }
      if (agoraData.client) {
        agoraData.client.leave()
      }
    },
  })

  const close = createEvent()
  forward({
    from: close,
    to: [leaveAgoraFx, reset],
  })

  const changeFullScreen = createEvent<boolean>()
  const $fullScreen = restore(changeFullScreen, false).reset(reset)

  const changeMicro = createEvent<boolean>()
  const $micro = restore(changeMicro, true).reset(reset)

  forward({
    from: changeMicro,
    to: changeAgoraMicroFx,
  })

  const changeVideo = createEvent<boolean>()
  const $video = restore(changeVideo, true).reset(reset)

  forward({
    from: changeVideo,
    to: changeAgoraVideoFx,
  })

  const changeInterlocutor = createEvent<Client | null>()
  const $interlocutorData = restore<Client | null>(changeInterlocutor, null).reset(reset)

  forward({
    from: getSessionDataFx.doneData.map(session => (config.dashboard === "coach" ? session.clients[0] : session.coach)),
    to: changeInterlocutor,
  })

  guard({
    source: $minutesLeft,
    filter: minutes => minutes !== false && minutes <= 0,
    target: close
  })

  const $transformedInterlocutor = $interlocutorData.map(user =>
    user ? { avatar: user.avatar, name: `${user.firstName} ${user.lastName}` } : null
  )

  const $self = combine($micro, $video, $fullScreen, (micro, video, fullscreen) => ({
    micro,
    video,
    fullscreen,
  }))

  const $interlocutor = combine(
    $transformedInterlocutor,
    $interlocutorMicrophoneStatus,
    $interlocutorVideoStatus,
    $interculatorWasConnected,
    $interculatorIsConnected,
    (info, micro, video, wasConnected, connected) => ({
      info,
      video,
      micro,
      wasConnected,
      connected,
    })
  )

  const $time = combine($minutesLeft, $isCloseToTerminate, (minutesLeft, isCloseToTerminate) => ({
    minutesLeft,
    isCloseToTerminate
  }))

  return {
    data: {
      $sessionId,
      $callsVisibility,
      $self,
      $interlocutor,
      $time,
      dashboardType: config.dashboard
    },
    methods: {
      play,
      changeFullScreen,
      changeMicro,
      changeVideo,
      connectToSession,
      close,
    },
  }
}

export const coachCall = createSessionCallModule({
  dashboard: "coach",
  getConnectDataRequest: getCoachSessionVideoToken,
  getSessionRequest: getCoachSession,
})

export const CoachSessionCall = createSessionCall(coachCall)

export const clientCall = createSessionCallModule({
  dashboard: "client",
  getConnectDataRequest: getClientSessionVideoToken,
  getSessionRequest: getClientSession,
})

export const ClientSessionCall = createSessionCall(clientCall)
