import { createEffect, createEvent, createStore, forward, restore } from "effector-root"
import { runInScope } from "@/scope"
import { Client as AgoraClient, MediaDeviceInfo, Stream } from "agora-rtc-sdk"

type TestingParams = {
  uid: number
  type: "audio" | "video"
  selectedDevice?: MediaDeviceInfo | MediaDeviceInfo[] | string
}

type Agora = {
  client: null | AgoraClient
  localStream: null | Stream
  remoteStream: null | Stream
}

let agoraLib: any = null
if (process.env.BUILD_TARGET === "client") {
  agoraLib = require("agora-rtc-sdk")
}

export const createTestCallModule = () => {
  const agoraData: Agora = {
    client: null,
    localStream: null,
    remoteStream: null,
  }

  const mounted = createEvent<"audio" | "video">()
  const setAudioLevel = createEvent<number>()
  const play = createEvent<"audio" | "video">()
  const close = createEvent()
  const test = createEvent<TestingParams>()

  const $audioLevel = restore(setAudioLevel, 0)

  const changeGrantedPermissionForCamera = createEvent<boolean>()
  const changeGrantedPermissionForMic = createEvent<boolean>()

  const $userGrantedPermission = createStore({
    micro: false,
    camera: false,
  })
    .on(changeGrantedPermissionForCamera, (state, payload) => {
      return { micro: state.micro, camera: payload }
    })
    .on(changeGrantedPermissionForMic, (state, payload) => {
      return { micro: payload, camera: state.camera }
    })

  const getDevicesFx = createEffect({
    handler: (type: "audio" | "video") => {
      agoraData.localStream = agoraLib.getDevices((devices: MediaDeviceInfo[]) => {
        const audioDevices = devices.filter(device => device.kind === "audioinput" && device.deviceId.length > 0)
        const videoDevices = devices.filter(device => device.kind === "videoinput" && device.deviceId.length > 0)

        videoDevices.length > 0
          ? runInScope(changeGrantedPermissionForCamera, true)
          : runInScope(changeGrantedPermissionForCamera, false)
        audioDevices.length > 0 && videoDevices.length > 0
          ? runInScope(changeGrantedPermissionForMic, true)
          : runInScope(changeGrantedPermissionForMic, false)

        const uid = Math.floor(Math.random() * 10000)
        const selectedMicrophoneId = audioDevices.filter(device => device.deviceId === "default")
        const selectedCameraId = videoDevices.filter(device => device.deviceId === "default")
        test({ uid: uid, type: type, selectedDevice: type === "audio" ? selectedMicrophoneId : selectedCameraId })
      })
    },
  })

  const testingDevicesFx = createEffect({
    handler: (params: TestingParams) => {
      if (agoraLib) {
        //microphoneId: params.selectedDevice,
        //cameraId: params.selectedDevice,
        const streamSpecs =
          params.type === "audio"
            ? {
                streamID: params.uid,
                audio: true,
                video: true,
                screen: false,
              }
            : {
                streamID: params.uid,
                audio: false,
                video: true,
                screen: false,
              }

        agoraData.localStream = agoraLib.createStream(streamSpecs)

        agoraData?.localStream?.init(() => {
          play(params.type)
        })
      }
    },
  })

  let timer: any

  const playFx = createEffect({
    handler: (type: "audio" | "video") => {
      if (agoraData.localStream) {
        if (type === "audio") {
          if (agoraData.localStream.isPlaying()) {
            agoraData.localStream.stop()
          }

          timer = setInterval(() => {
            // @ts-ignore
            setAudioLevel(Math.floor(agoraData.localStream.getAudioLevel() * 100))
          }, 50)
        } else {
          if (agoraData.localStream.isPlaying()) {
            agoraData.localStream.stop()
          }

          const player = document.getElementById("VideoTest")
          if (player) {
            player.innerHTML = ""
          }
          agoraData.localStream.play("VideoTest", { fit: "cover" })
        }
      }
    },
  })

  const closeFx = createEffect({
    handler: () => {
      clearTimeout(timer)
      if (agoraData.localStream) {
        agoraData.localStream.close()
      }
    },
  })

  forward({
    from: close,
    to: closeFx,
  })

  forward({
    from: play,
    to: playFx,
  })

  forward({
    from: test,
    to: testingDevicesFx,
  })

  forward({
    from: mounted,
    to: getDevicesFx,
  })

  return {
    data: {
      $audioLevel,
      $userGrantedPermission,
    },
    methods: {
      play,
      mounted,
      close,
    },
  }
}
export const testCall = createTestCallModule()
