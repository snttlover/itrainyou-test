import { uploadMedia } from "@app/lib/api/media"
import { imageUploaded } from "@app/pages/auth/pages/signup/content/step-3/step3.model"
import { signUpDomain } from "@app/pages/auth/pages/signup/signup.model"
import { forward } from "effector"

export const uploadImage = signUpDomain.createEvent<File | Blob>()
const uploadPercentChanged = signUpDomain.createEvent<number>()

export const uploadImageFx = signUpDomain.createEffect({
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

export const $uploadPercent = signUpDomain
  .createStore(0)
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
