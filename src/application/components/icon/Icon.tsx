import React from "react"

type IconProps = {
  name: string
} & React.SVGProps<SVGSVGElement>

export const Icon = ({ name, fill = '#999', ...props }: IconProps) => {
  const icon = require(`./icons/${name}.svg?sprite`)

  return (
    <svg viewBox={icon.viewBox} fill={fill} width={24} height={24} {...props}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  )
}
