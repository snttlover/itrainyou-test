import * as React from "react"
import styled from "styled-components"
import { SocialIcon } from "@/pages/auth/pages/login/content/SocialIcon"
import {  logInWithSocials } from "@/pages/auth/pages/signup/content/socials/socials.model"
import { useEvent} from "effector-react"
import { config } from "@/config"

const ExternalLink = styled.a``

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

  const handleSocials = (socialNetwork: "vk" | "facebook" | "google") => {
    _logInWithSocials(socialNetwork)
  }

  return (
    <>
      <SocialsM>
        <SocialIcon name="google" />
        <SocialIcon name="vk" />
        <ExternalLink
          href={`https://www.facebook.com/v3.0/dialog/oauth?client_id=${config.FACEBOOK_CLIENT_ID}&display=popup&response_type=token&redirect_uri=https://${window.location.hostname}/auth/socials&fields=id,name,email,gender,birthday,profile_pic,profile_picture`}
          onClick={()=>handleSocials("facebook")}>
          <SocialIcon name="facebook" />
        </ExternalLink>
      </SocialsM>
      <SocialsS>
        <SocialIcon name="google-s" />
        <SocialIcon name="vk-s" />
        <SocialIcon name="facebook-s" />
      </SocialsS>
    </>
  )
}
