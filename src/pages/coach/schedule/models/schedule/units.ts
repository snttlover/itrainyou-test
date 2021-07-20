import { attach, createEffect, createEvent, createStore } from "effector-root"
import { getCoachSchedule } from "@/lib/api/coaching-sessions/get-coach-schedule"
import { CreateCoachSchedule, UpdateCoachSchedule } from "@/lib/api/coaching-sessions/types"
import { updateCoachSchedule } from "@/lib/api/coaching-sessions/update-coach-schedule"
import { createCoachSchedule } from "@/lib/api/coaching-sessions/create-coach-schedule"
import { createGate } from "@/scope"
import { DurationType } from "@/lib/api/coach-sessions"
import { loadSystemInfoFx } from "@/models/units"

export const loadScheduleFx = createEffect({
  handler: getCoachSchedule,
})

export const $isEdit = createStore(false).on(loadScheduleFx.doneData, () => true)
export const $feeRatio = createStore(0).on(
  loadSystemInfoFx.doneData, (_, data) => data.platformSessionFee
)

export type toggleInputDurationPrice = {
  showModal: boolean,
  duration: DurationType,
}

export const toggleInputDurationPriceModal = createEvent<toggleInputDurationPrice>()
export const $isInputDurationPriceModalShowed = createStore<boolean>(false)
$isInputDurationPriceModalShowed.on(
  toggleInputDurationPriceModal,
  (state, payload) => {
    return payload.showModal
  }
)

export const $inputDurationPriceModelDuration = createStore<DurationType>("D30")
$inputDurationPriceModelDuration.on(
  toggleInputDurationPriceModal,
  (state, payload) => {
    return payload.duration
  }
)

export const updateScheduleFx = attach({
  effect: createEffect({
    handler: ({ form, isEdit }: { form: UpdateCoachSchedule; isEdit: boolean }) => {
      if (isEdit) {
        return updateCoachSchedule({
          ...(form as UpdateCoachSchedule),
        })
      } else {
        return createCoachSchedule({
          isAvailable: false,
          d30Price: null,
          d45Price: null,
          d60Price: null,
          d90Price: null,
          weekdaySlots: [],
          ...(form as CreateCoachSchedule),
        })
      }
    },
  }),
  source: $isEdit,
  mapParams: (form: UpdateCoachSchedule, isEdit) => ({
    isEdit,
    form,
  }),
})
export const ScheduleGate = createGate()