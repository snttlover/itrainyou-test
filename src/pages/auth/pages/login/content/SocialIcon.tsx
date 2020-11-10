import React from "react"
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"

type SocialIconTypes = {
  name: "vk" | "google" | "facebook" | "vk-s" | "google-s" | "facebook-s"
}

export const SocialIcon = ({ name }: SocialIconTypes) => {
  // @ts-ignore
  const CurrentIcon = styled(Icon).attrs({ name: `${name}-login` })`
    margin: 0 8px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  `
  return (
    <>
      <CurrentIcon />
    </>
  )
}
