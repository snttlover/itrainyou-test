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

export const redirect_uri=`http://localhost/auth/socials`
//export const http = `https://oauth.vk.com/authorize?client_id=6786907&scope=photos,offline,email&redirect_uri=${redirect_uri}&display=page&v=5.0&response_type=token`
export const http = `https://www.facebook.com/v3.0/dialog/oauth?client_id=588161764971621&display=popup&response_type=token&redirect_uri=${redirect_uri}&fields=id,name,email,gender,birthday,profile_pic,profile_picture`

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
  const parsed = parseQueryString<{ search?: string }>(location.hash)["#access_token"]
  useEffect(() => {
    //const querySearch = parseQueryString<{ search?: string }>(location.hash)
    console.log("Location",location)
    console.log("Token",parsed)
    //console.log("token",querySearch["#access_token"])
    _mounted(parsed)
  }, [])
  return (
    <Container>
      <Spinner/>
    </Container>
  )
}
