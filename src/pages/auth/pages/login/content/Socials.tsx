import * as React from "react"
import styled from "styled-components"
import { Social } from "@/pages/auth/pages/login/content/Social"
import {  logInWithSocials } from "@/pages/auth/pages/signup/content/socials/socials.model"
import { useEvent} from "effector-react"
import { config as appConfig } from "@/config"

//const redirect_uri= process.env.NODE_ENV === "development" ? `http://localhost/auth/socials` : `${appConfig.BACKEND_URL}auth/socials`

//const https =`https://www.facebook.com/v3.0/dialog/oauth?client_id=588161764971621&display=popup&response_type=token&redirect_uri=${redirect_uri}&fields=id,name,email,gender,birthday,profile_pic,profile_picture`
const https = `https://www.facebook.com/v3.0/dialog/oauth?client_id=588161764971621&display=popup&response_type=token&redirect_uri=http://localhost/auth/socials&fields=id,name,email,gender,birthday,profile_pic,profile_picture`

const ExternalLink = styled.a`

`

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

export const Socials = () => {
  const _logInWithSocials = useEvent(logInWithSocials)
  const handleSocials = (socials: string) => {
    _logInWithSocials(socials)
  }
  return (
    <>
      <SocialsM>
        <Social name="google" />
        <Social name="vk" />
        <ExternalLink href={https} onClick={()=>handleSocials("facebook")}><Social name="facebook" /></ExternalLink>
      </SocialsM>
      <SocialsS>
        <Social name="google-s" />
        <Social name="vk-s" />
        <Social name="facebook-s" />
      </SocialsS>
    </>
  )
}
