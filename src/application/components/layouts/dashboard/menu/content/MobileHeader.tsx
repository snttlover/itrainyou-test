import styled from "styled-components"
import logoImage from '../images/logo.svg'
import { Icon } from "@/application/components/icon/Icon"
import { MediaRange } from "@/application/lib/responsive/media"
import { useEvent } from "effector-react"
import { toggleBlueLayoutMobileMenuVisibility } from "@/application/components/layouts/dashboard/menu/blue-layout.mobile-menu"

const Logo = styled.img.attrs({ src: logoImage })`
  width: 36px;
  height: 36px;
`

const CloseIcon = styled(Icon).attrs({ name: `close` })`
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #fff;
  ${MediaRange.greaterThan('mobile')`
    width: 36px;
    height: 36px;
  `}
  ${MediaRange.greaterThan('tablet')`
    display: none;
  `}
`

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${MediaRange.greaterThan(`tablet`)`
    display: none;
  `}
`

export const MobileHeader = () => {
  const toggle = useEvent(toggleBlueLayoutMobileMenuVisibility)

  return (
    <StyledHeader>
      <Logo />
      <CloseIcon onClick={() => toggle()} />
    </StyledHeader>
  )
}