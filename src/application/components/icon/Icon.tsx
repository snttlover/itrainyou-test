import React from "react"
import styled from "styled-components"

export type IconName =
  | "tabletka"
  | "arrow"
  | "cross"
  | "facebook"
  | "notification"
  | "burger"
  | "google"
  | "mark"
  | "ruble"
  | "delete"
  | "left-icon"
  | "right-icon"
  | "rotate"
  | "tail-arrow"
  | "vk"
  | "top-coach"
  | "rounded-user"
  | "checkbox-border"
  | "checkbox-active"
  | "user"
  | "search"
  | "close"
  | "calendar"
  | "contacts"
  | "star"
  | "full-star"
  | "half-star"
  | "hand"
  | "help"
  | "home"
  | "my-coaches"
  | "my-purse"
  | "settings"

type IconProps = {
  name: IconName
} & React.SVGProps<SVGSVGElement>

export const Icon = styled(({ name, ...props }: IconProps) => {
  const icon = require(`./icons/${name}.svg?sprite`)

  return (
    <svg viewBox={icon.viewBox} width={24} height={24} {...props}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  )
})``
