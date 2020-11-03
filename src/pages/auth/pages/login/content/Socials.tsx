import * as React from "react"
import styled from "styled-components"
import { Social } from "@/pages/auth/pages/login/content/Social"
import { step1RegisteredFromSocials } from "@/pages/auth/pages/signup/content/step-1/step1.model"
import { useEvent} from "effector-react"
import { useLocation } from "react-router-dom"
import { parseQueryString } from "@/lib/helpers/query"
import { useEffect } from "react"

const SocialsRoot = styled.div`
  width: 100%;
  justify-content: center;
  margin-bottom: 36px;

  @media screen and (min-width: 768px) {
    margin-bottom: 16px;
  }
`

const SocialsS = styled(SocialsRoot)`
  display: flex;

  @media screen and (min-width: 480px) {
    display: none;
  }
`

const SocialsM = styled(SocialsRoot)`
  display: none;

  @media screen and (min-width: 480px) {
    display: flex;
  }
`

export const Socials = (props) => {
  const _step1RegisteredFromSocials = useEvent(step1RegisteredFromSocials)
  const handleSocials = (event: any )  => {
    event.preventDefault()
    _step1RegisteredFromSocials()
  }
  const location = useLocation()
  useEffect(() => {
    const querySearch = parseQueryString<{ search?: string }>(location).key
    console.log("querysearch",querySearch)
    console.log("LOCATION",location)
  }, [])
  return (
    <>
      <SocialsM onClick={handleSocials}>
        <Social name="google" />
        <Social name="vk" />
        <Social name="facebook" />
      </SocialsM>
      <SocialsS onClick={handleSocials}>
        <Social name="google-s" />
        <Social name="vk-s" />
        <Social name="facebook-s" />
      </SocialsS>
    </>
  )
}
