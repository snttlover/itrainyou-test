import * as React from "react"
import styled from "styled-components"
import { useEvent } from "effector-react"
import { Spinner } from "@/components/spinner/Spinner"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { parseQueryString } from "@/lib/helpers/query"
import {
  signUpWithSocialsPageMounted, SOCIAL_NETWORK_SAVE_KEY
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
  const _mounted = useEvent(signUpWithSocialsPageMounted)
  const location = useLocation()
  const token: string = parseQueryString<{ search?: string }>(location.hash)["#access_token"]
  const email: string = parseQueryString<{ search?: string }>(location.hash)["email"] || ""
  // @ts-ignore
  const socialNetwork: "vk" | "google" | "facebook" | null  = localStorage.getItem(SOCIAL_NETWORK_SAVE_KEY).replace(/\"/g, '')
  useEffect(() => {
    _mounted({ token, socialNetwork, email })
  }, [])
  return (
    <Container>
      <Spinner/>
    </Container>
  )
}
