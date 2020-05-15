import { fetchCategoriesListFx } from "@/application/feature/categories/categories.store"
import { Step4Coach } from "@/application/pages/auth/pages/signup/content/step-4/Step4Coach"
import { $userData } from "@/application/pages/auth/pages/signup/signup.model"
import { useEffect } from "react"
import { Step4Client } from "./Step4Client"
import { useStore } from "effector-react"
import * as React from "react"

function throwCompileTimeError(x: never): never {
  throw new Error(`Unknown kind ${x}`);
}

export const Step4 = () => {
  const userData = useStore($userData)

  useEffect(() => {
    fetchCategoriesListFx({})
  }, [])

  switch (userData.type) {
    case 'client':
      return <Step4Client />
    case 'coach':
      return <Step4Coach />
    default:
      return throwCompileTimeError(userData)
  }
}

