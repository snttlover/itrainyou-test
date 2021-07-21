import { createEffect } from "effector-root"
import { getSystemInfo } from "@/lib/api/system-info"
import { createGate } from "@/scope"

export const loadSystemInfoFx = createEffect({
  handler: getSystemInfo,
})

export const ApplicationGate = createGate()
