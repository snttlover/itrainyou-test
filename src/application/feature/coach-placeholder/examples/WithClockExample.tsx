import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { GirlWithClock } from "@/application/feature/coach-placeholder/right-images/GirlWithClock"
import React from "react"

const features = [`Смотреть список своих клиентов`, `Искать по своим клиентам`]

export const WithClockExample = () => <CoachSectionPlaceholder features={features} renderImage={() => <GirlWithClock />} />
