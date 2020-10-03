import { uploadMedia } from "@/lib/api/media"
import { imageUploaded } from "./client-profile.model"
import { createEffect, createEvent, createStore, forward } from "effector-root"

export const uploadImage = createEvent<File | Blob>()
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

export const $uploadPercent = createStore(0)
  .on(uploadPercentChanged, (state, payload) => payload)
  .reset(uploadImageFx.finally)

forward({
  from: uploadImage,
  to: uploadImageFx,
})

forward({
  from: uploadImageFx.doneData,
  to: imageUploaded,
})
