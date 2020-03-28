import { uploadMedia } from "@/application/lib/api/media"
import { imageUploaded } from "@/application/pages/auth/pages/signup/content/step-3/step3.model"
import { createEffect, createEvent, createStore, forward } from "effector-next"

export const uploadImage = createEvent<File | Blob>()
const uploadPercentChanged = createEvent<number>()

export const uploadImageFx = createEffect({
  handler: (file: File | Blob) => {
    return uploadMedia(
      {
        type: "IMAGE",
        file
      },
      (pe: ProgressEvent) => {
        uploadPercentChanged(Math.round((pe.loaded * 100) / pe.total))
      }
    )
  }
})

export const $uploadPercent = createStore(0)
  .on(uploadPercentChanged, (state, payload) => payload)
  .reset(uploadImageFx.finally)

forward({
  from: uploadImage,
  to: uploadImageFx
})

forward({
  from: uploadImageFx.doneData,
  to: imageUploaded
})
