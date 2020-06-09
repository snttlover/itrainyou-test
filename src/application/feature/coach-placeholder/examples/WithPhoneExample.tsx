import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "@/application/feature/coach-placeholder/right-images/PhoneWithGirl"
import React from "react"

const features = [`Смотреть список своих клиентов`, `Искать по своим клиентам`, `Переходить к диалогу с клиентом`]

export const WithPhoneExample = () => (
  <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
)
