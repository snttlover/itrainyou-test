import * as React from "react"
import styled from "styled-components"
import { useEvent } from "effector-react"
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

export const SignUpWithSocialsPage = () => {
  const _mounted = useEvent(mounted)
  const location = useLocation()
  const parsed = parseQueryString<{ search?: string }>(location.hash)["#access_token"]
  useEffect(() => {
    _mounted(parsed)
  }, [])
  return (
    <Container>
      <Spinner/>
    </Container>
  )
}
