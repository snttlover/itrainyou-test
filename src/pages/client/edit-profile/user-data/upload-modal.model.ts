import { uploadMedia } from "@/lib/api/media"
import { imageUploaded, originalAvatarUploaded } from "./client-profile.model"
import { createEffect, createEvent, createStore, forward, sample } from "effector-root"
import { combineEvents } from "patronum"

export const uploadImage = createEvent<File | Blob>()
export const uploadOriginalAvatar = createEvent<File | Blob>()
const uploadPercentChanged = createEvent<number>()
const uploadOriginalAvatarPercentChanged = createEvent<number>()

export const uploadImageFx = createEffect({
  handler: (file: File | Blob) => {
    return uploadMedia(
      {
        type: "IMAGE",
        file,
      },
      (pe: ProgressEvent) => {
        uploadPercentChanged(Math.round((pe.loaded * 100) / pe.total))
      }
    )
  },
})

export const uploadOriginalAvatarFx = createEffect({
  handler: (file: File | Blob) => {
    return uploadMedia(
      {
        type: "IMAGE",
        file,
      },
      (pe: ProgressEvent) => {
        uploadOriginalAvatarPercentChanged(Math.round((pe.loaded * 100) / pe.total))
      }
    )
  },
})

const waitAllEvents = combineEvents({ events: [uploadImageFx.done, uploadOriginalAvatarFx.done] })

export const $uploadPercent = createStore(0)
  .on(uploadPercentChanged, (state, payload) => (state + payload)/2)
  .on(uploadOriginalAvatarPercentChanged, (state,payload) => (state + payload)/2)
  .reset(waitAllEvents)

forward({
  from: uploadOriginalAvatar,
  to: uploadOriginalAvatarFx,
})

forward({
  from: uploadImage,
  to: uploadImageFx,
})

sample({
  source: uploadImageFx.doneData,
  clock: waitAllEvents,
  target: imageUploaded,
})

sample({
  source: uploadOriginalAvatarFx.doneData,
  clock: waitAllEvents,
  target: originalAvatarUploaded,
})
