import { fetchCategoriesList } from "#/feature/categories/categories.store"
import { Step4Coach } from "#/pages/auth/pages/signup/content/step-4/Step4Coach"
import { $userData } from "#/pages/auth/pages/signup/signup.model"
import { useEffect } from "react"
import { Step4Client } from "./Step4Client"
import { useEvent, useStore } from "effector-react/ssr"
import * as React from "react"

function throwCompileTimeError(x: never): never {
  throw new Error(`Unknown kind ${x}`)
}

export const Step4 = () => {
  const userData = useStore($userData)
  const fetchCategories = useEvent(fetchCategoriesList)

  useEffect(() => {
    fetchCategories()
  }, [])

  switch (userData.type) {
    case "client":
      return <Step4Client />
    case "coach":
      return <Step4Coach />
    default:
      return throwCompileTimeError(userData.type)
  }
}
