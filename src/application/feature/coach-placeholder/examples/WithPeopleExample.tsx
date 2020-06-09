import { CoachSectionPlaceholder } from "@/application/feature/coach-placeholder/CoachSectionPlaceholder"
import { PeopleOnTheClouds } from "@/application/feature/coach-placeholder/right-images/PeopleOnTheClouds"
import React from "react"

const features = [`Смотреть список своих клиентов`, `Искать по своим клиентам`, `Переходить к диалогу с клиентом`]

export const WithPeopleExample = () => (
  <CoachSectionPlaceholder features={features} renderImage={() => <PeopleOnTheClouds />} />
)
