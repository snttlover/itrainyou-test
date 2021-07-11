import React from "react"
import { Icon } from "@/oldcomponents/icon/Icon"
import { toasts } from "@/oldcomponents/layouts/behaviors/dashboards/common/toasts/toasts"

export type CopyLinkIconProps = {
  className?: string
  link: () => string | string
}

export const CopyLinkIcon: React.FC<CopyLinkIconProps> = ({ link, ...props }) => {
  const copy = () => {
    const copyText = typeof link === "function" ? link() : link
    navigator.clipboard.writeText(copyText)
    toasts.add({
      type: "info",
      text: "Ссылка скопирована в буфер обмена",
    })
  }

  return <Icon name='copy' {...props} onClick={copy} />
}
