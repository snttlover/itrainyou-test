import { CoachSectionPlaceholder } from "#/feature/coach-placeholder/CoachSectionPlaceholder"
import { PhoneWithGirl } from "#/feature/coach-placeholder/right-images/PhoneWithGirl"
import * as React from "react"

const features = ["Настраивать свое расписание", "Настраивать пакеты сессий", "Управлять доступностью профиля"]
export const CoachSchedulePlaceholder = () => (
  <CoachSectionPlaceholder features={features} renderImage={() => <PhoneWithGirl />} />
)
