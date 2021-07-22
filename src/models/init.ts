import { forward } from "effector-root"
import { ApplicationGate, loadSystemInfoFx } from "@/models/units"
// Инициаизация связей модулей
import "@/pages/auth/pages/socials/models/init"
import "@/pages/auth/pages/signup/models/init"
import "@/pages/search/coach-by-id/models/init.ts"
import "@/pages/coach/schedule/models/price-settings/init.ts"
import "@/pages/coach/schedule/models/schedule/init.ts"
import "@/feature/client-funds-up/dialog/models/init.ts"
import "@/pages/client/profile/content/become-coach-dialog/models/init.ts"

forward({
  from: ApplicationGate.open,
  to: loadSystemInfoFx,
})
