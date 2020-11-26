import { uploadMedia } from "@/lib/api/media"
import { imageUploaded } from "@/pages/auth/pages/signup/content/step-3/step3.model"
import { createEffect, createEvent, createStore, forward } from "effector-root"
import { combineEvents } from "patronum"

export const uploadImage = createEvent<File | Blob>()
export const uploadOriginalAvatar = createEvent<File | Blob>()
const uploadPercentChanged = createEvent<number>()

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
        uploadPercentChanged(Math.round((pe.loaded * 100) / pe.total))
      }
    )
  },
})
const waitAllEvents = combineEvents({ events: [uploadImageFx.doneData, uploadOriginalAvatarFx.doneData] })

export const $uploadPercent = createStore(0)
  .on(uploadPercentChanged, (state, payload) => payload)
  .reset(uploadImageFx.finally)

forward({
  from: uploadOriginalAvatar,
  to: uploadOriginalAvatarFx,
})

forward({
  from: uploadImage,
  to: uploadImageFx,
})

forward({
  from: uploadImageFx.doneData,
  to: imageUploaded,
})
