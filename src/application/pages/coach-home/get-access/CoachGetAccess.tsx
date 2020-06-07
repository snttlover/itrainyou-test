import { fetchCategoriesListFx } from "@/application/feature/categories/categories.store"
import { CoachInformation } from "@/application/feature/coach-get-access/components/CoachInformation"
import React, { useEffect } from "react"

export const CoachGetAccess = () => {
  useEffect(() => {
    fetchCategoriesListFx({})
  }, [])

  return <CoachInformation onRegisterClick={() => {}} loading={false} />
}
