import { $userData } from "@app/pages/auth/pages/signup/signup.model"
import { Step4Client } from "./Step4Client"
import { useStore } from "effector-react/ssr"
import * as React from "react"

function throwCompileTimeError(x: never): never {
  throw new Error(`Unknown kind ${x}`);
}

export const Step4 = () => {
  const registerUserType = useStore($userData).type

  switch (registerUserType) {
    case 'client':
      return <Step4Client />
    case 'couch':
      return <div>Couch</div>
    default:
      return throwCompileTimeError(registerUserType)
  }
}

