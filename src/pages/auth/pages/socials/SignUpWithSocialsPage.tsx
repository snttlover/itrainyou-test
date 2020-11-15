import * as React from "react"
import styled from "styled-components"
import { useGate } from "effector-react"
import { Spinner } from "@/components/spinner/Spinner"
import {
  signUpWithSocialsPageGate,
} from "./socials.model"


const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const SignUpWithSocialsPage = () => {

  useGate(signUpWithSocialsPageGate)

  return (
    <Container>
      <Spinner/>
    </Container>
  )
}