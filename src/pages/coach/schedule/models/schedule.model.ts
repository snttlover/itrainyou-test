import { Toast, toasts } from "@/components/layouts/behaviors/dashboards/common/toasts/toasts"
import { createCoachSchedule } from "@/lib/api/coaching-sessions/create-coach-schedule"
import { getCoachSchedule } from "@/lib/api/coaching-sessions/get-coach-schedule"
import { CreateCoachSchedule } from "@/lib/api/coaching-sessions/types"
import { updateCoachSchedule } from "@/lib/api/coaching-sessions/update-coach-schedule"
import { getSystemInfo } from "@/lib/api/system-info"
import { attach, createEffect, createStore, forward } from "effector-root"
import { createGate } from "@/scope"

export const loadScheduleFx = createEffect({
  handler: getCoachSchedule,
})

const loadSystemInfoFx = createEffect({
  handler: getSystemInfo,
})

export const $isEdit = createStore(false).on(loadScheduleFx.doneData, () => true)
export const $feeRatio = createStore(0).on(loadSystemInfoFx.doneData, (_, data) => data.platformSessionFee)

export const updateScheduleFx = attach({
  effect: createEffect({
    handler: ({ form, isEdit }: { form: CreateCoachSchedule; isEdit: boolean }) => {
      const method = isEdit ? updateCoachSchedule : createCoachSchedule

      return method({ weekdaySlots: [], ...form })
    },
  }),
  source: $isEdit,
  mapParams: (form: CreateCoachSchedule, isEdit) => ({
    isEdit,
    form,
  }),
})

const successMessage: Toast = {
  type: "info",
  text: "Цены сохранены",
}

forward({
  from: updateScheduleFx.doneData.map(_ => successMessage),
  to: [toasts.remove, toasts.add],
})

export const ScheduleGate = createGate()

forward({
  from: ScheduleGate.open,
  to: [loadScheduleFx, loadSystemInfoFx],
})
