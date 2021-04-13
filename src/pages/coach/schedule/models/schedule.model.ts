import { Toast, toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"
import { createCoachSchedule } from "@/lib/api/coaching-sessions/create-coach-schedule"
import { getCoachSchedule } from "@/lib/api/coaching-sessions/get-coach-schedule"
import { CreateCoachSchedule, UpdateCoachSchedule } from "@/lib/api/coaching-sessions/types"
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

$isEdit.on(updateScheduleFx.done, () => true)

export const ScheduleGate = createGate()

forward({
  from: ScheduleGate.open,
  to: [loadScheduleFx, loadSystemInfoFx],
})
