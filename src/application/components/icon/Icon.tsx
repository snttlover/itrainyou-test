import React from "react"
import styled from "styled-components"

type IconName = 'arrow' | 'cross' | 'facebook' | 'google' | 'mark' | 'rotate' | 'tail-arrow' | 'vk'

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
