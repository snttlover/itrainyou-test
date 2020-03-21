import { AuthLayout } from "@app/components/layouts/auth/AuthLayout"
import { NextButton } from "@app/pages/auth/pages/signup/components/NextButton"
import { Steps } from "@app/pages/auth/pages/signup/components/Steps"
import styled from "styled-components"
import { Step4Client } from "./Step4Client"
import { $registerUserType } from "@app/pages/auth/pages/signup/signup.model"
import { useStore } from "effector-react/ssr"
import * as React from "react"

const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function throwCompileTimeError(x: never): never {
  throw new Error(`Unknown kind ${x}`);
}

export const Step4 = () => {
  const registerUserType = useStore($registerUserType)

  switch (registerUserType) {
    case 'client':
      return <Step4Client />
    case 'couch':
      return <div>Couch</div>
    default:
      return throwCompileTimeError(registerUserType)
  }
}

