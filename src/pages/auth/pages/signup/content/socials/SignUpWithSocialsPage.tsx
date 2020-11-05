import * as React from "react"
import styled from "styled-components"
import { useEvent, useStore } from "effector-react"
import { Spinner } from "@/components/spinner/Spinner"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { parseQueryString } from "@/lib/helpers/query"
import {
  mounted,
} from "./socials.model"


const Container = styled.div`
  min-width: 320px;
  margin: 71px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SocialLink = styled.a`
  display: block;
  height: 52px;
  width: 52px;
`
const Button = styled.button`
  display: block;
  height: 52px;
  width: 52px;
`

export const SignUpWithSocialsPage = () => {
  const _mounted = useEvent(mounted)
  const location = useLocation()
  const parsed = parseQueryString<{ search?: string }>(location.hash)
  useEffect(() => {
    _mounted(parsed)
  }, [])
  return (
    <Container>
      <Spinner/>
    </Container>
  )
}
