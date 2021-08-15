import * as React from "react"
import styled from "styled-components"

export type IconName =
  | "chat"
  | "none"
  | "video"
  | "clip"
  | "star-with-user"
  | "calendar-with-clock"
  | "tabletka"
  | "arrow"
  | "cross"
  | "notification"
  | "burger"
  | "google"
  | "mark"
  | "ruble"
  | "people-notification"
  | "right-message-tail"
  | "left-message-tail"
  | "delete"
  | "file"
  | "chat-search"
  | "left-icon"
  | "right-icon"
  | "rotate"
  | "tail-arrow"
  | "vk"
  | "info"
  | "send"
  | "more"
  | "video2"
  | "top-coach"
  | "edit"
  | "rounded-user"
  | "checkbox-border"
  | "checkbox-active"
  | "user"
  | "chat-files"
  | "search"
  | "close"
  | "circle"
  | "right-arrow"
  | "yellow-star-circle"
  | "yellow-star"
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
  | "support"
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
  | "vk-login"
  | "google-login"
  | "facebook-login"
  | "vk-s-login"
  | "google-s-login"
  | "facebook-s-login"
  | "MasterCard"
  | "Visa"
  | "MIR"
  | "noletter"
  | "checkstep1"
  | "checkstep2"
  | "checkstep3-yandex"
  | "checkstep3-tinkoff"
  | "checkstep4"
  | "ykassa-approved"
  | "ykassa-not-approved"
  | "hang-up"
  | "no-cam-permission"
  | "no-mic-permission"
  | "ellipse-list-marker"
  | "maestro"
  | "file-preview"
  | "photos-icon"
  | "documents-icon"
  | "download"
  | "google-calendar"
  | "left-calendar-icon"
  | "copy"
  | "right-calendar-icon"
  | "step-done"
  | "checkbox-active-filled-border"
  | "checkbox-border-filled"
  | "go-back"
  | "question-mark"
  | "percents"
  | "warning"
  | "gift"
  | "gift-black"
  | "fb"
  | "instagram"
  | "tooltip-arrow"

type IconProps = {
  name: IconName
  disabled?: boolean
} & React.SVGProps<SVGSVGElement>

export const Icon = styled(({ name, ...props }: IconProps) => {
  const icon = require(`./icons/${name}.svg?sprite`)

  return (
    <svg viewBox={icon.viewBox} width={24} height={24} {...props}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  )
})``
