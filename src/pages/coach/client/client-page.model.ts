import { createGate } from "@/scope"
import { createEffect, forward } from "effector-root"

export const clientPageGate = createGate<number>()
const loadClientFx = createEffect({ handler: () => {} })

forward({
  from: clientPageGate.open,
  to: loadClientFx,
})
