import { $userData } from "@/feature/user/user.model"
import { Sex } from "@/lib/api/interfaces/utils.interface"
import { UploadMediaResponse } from "@/lib/api/media"
import { date } from "@/lib/formatting/date"
import { createEffectorField } from "@/lib/generators/efffector"
import { trimString } from "@/lib/validators"
import { createGate } from "@/scope"
import { Dayjs } from "dayjs"
import { combine, createEvent, createStore, sample } from "effector-root"
import { every, spread } from "patronum"

export const imageUploaded = createEvent<UploadMediaResponse>()
export const $image = createStore<UploadMediaResponse>({ id: -1, type: "IMAGE", file: "" }).on(
  imageUploaded,
  (state, payload) => payload
)

const $isImageError = $image.map(img => (!img.file && "Изображение обязательно к загрузке") || null)
const $isImageCorrect = $isImageError.map(error => !error)

export const toggleUploadModal = createEvent()
export const $isUploadModelOpen = createStore(false)
  .on(toggleUploadModal, store => !store)
  .on(imageUploaded, () => false)

export const [$name, nameChanged, $nameError, $isNameCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => (!value ? "Поле обязательно к заполнению" : null),
  eventMapper: event => event.map(trimString),
})

export const [$lastName, lastNameChanged, $lastNameError, $isLastNameCorrect] = createEffectorField({
  defaultValue: "",
  validator: value => (!value ? "Поле обязательно к заполнению" : null),
  eventMapper: event => event.map(trimString),
})

export const [$birthday, birthdayChanged, $birthdayError, $isBirthdayCorrect] = createEffectorField<Dayjs>({
  defaultValue: date(),
  validator: value => (!value ? "Поле обязательно к заполнению" : null),
})

export const [$sex, sexChanged, $sexError, $isSexCorrect] = createEffectorField<Sex>({
  defaultValue: "M",
  validator: value => (!value ? "Поле обязательно к заполнению" : null),
})

export const $step3Form = combine({
  image: $image,
  name: $name,
  lastName: $lastName,
  birthday: $birthday,
  sex: $sex,
})

export const userProfileGate = createGate()

spread(
  sample({
    clock: userProfileGate.open,
    source: $userData,
    fn: data => ({
      firstName: data.coach!.firstName,
      lastName: data.coach!.lastName,
      birthDate: data.coach!.birthDate,
      sex: data.coach!.sex,
      avatar: data.coach!.avatar,
    }),
  }),
  {
    firstName: nameChanged,
    lastName: lastNameChanged,
    birthDate: birthdayChanged.prepend((birthDate: string) =>
      date(birthDate, "YYYY-MM-DD").isValid() ? date(birthDate, "YYYY-MM-DD") : date()
    ),
    sex: sexChanged,
    avatar: imageUploaded.prepend((avatar: string) => ({ id: -1, type: "IMAGE", file: avatar })),
  }
)

export const $step3FormErrors = combine({
  name: $nameError,
  lastName: $lastNameError,
  birthday: $birthdayError,
  sex: $sexError,
})

export const $isStep3FormValid = every(true, [
  $isNameCorrect,
  $isLastNameCorrect,
  $isBirthdayCorrect,
  $isSexCorrect,
  $isImageCorrect,
])
