import { createGate } from "@/scope"
import { forward } from "effector-root"
import { loadSystemInfoFx } from "@/feature/coach-get-access/coach-get-access.model"

export const ApplicationGate = createGate()

forward({
  from: ApplicationGate.open,
  to: loadSystemInfoFx,
})