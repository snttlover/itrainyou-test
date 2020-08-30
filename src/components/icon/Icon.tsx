import * as React from "react"
import styled from "styled-components"

export type IconName =
  | "none"
  | "video"
  | "clip"
  | "star-with-user"
  | "calendar-with-clock"
  | "tabletka"
  | "arrow"
  | "cross"
  | "facebook"
  | "notification"
  | "burger"
  | "google"
  | "mark"
  | "ruble"
  | "people-notification"
  | "delete"
  | "left-icon"
  | "right-icon"
  | "rotate"
  | "tail-arrow"
  | "vk"
  | "info"
  | "more"
  | "video2"
  | "top-coach"
  | "edit"
  | "rounded-user"
  | "checkbox-border"
  | "checkbox-active"
  | "user"
  | "search"
  | "close"
  | "enabled-video"
  | "disabled-video"
  | "enabled-micro"
  | "disabled-micro"
  | "enabled-fullscreen"
  | "disabled-fullscreen"
  | "disabled-interlocutor-micro"
  | "calendar"
  | "contacts"
  | "star"
  | "full-star"
  | "half-star"
  | "plus"
  | "eye-open"
  | "hearth-full"
  | "hearth"
  | "eye-close"
  | "hand"
  | "help"
  | "home"
  | "bell"
  | "my-coaches"
  | "my-purse"
  | "settings"
  | "not-found-desktop"
  | "not-found-tablet"
  | "not-found-mobile"
  | "camera"
  | "image"
  | "document"
  | "play"
  | "minus"

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
