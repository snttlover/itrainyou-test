import { forward } from "effector-root"
import { savePricesFx } from "@/pages/coach/schedule/models/price-settings/units"
import {
  $isEdit,
  loadScheduleFx,
  ScheduleGate, toggleInputDurationPrice,
  toggleInputDurationPriceModal,
  updateScheduleFx
} from "@/pages/coach/schedule/models/schedule/units"
import { loadSystemInfoFx } from "@/models/units"

forward({
  from: savePricesFx.doneData.map((_): toggleInputDurationPrice => {
    return {showModal: false, duration: "D30"}
  }),
  to: toggleInputDurationPriceModal,
})

$isEdit.on(updateScheduleFx.done, () => true)

forward({
  from: ScheduleGate.open,
  to: [loadScheduleFx, loadSystemInfoFx],
})
