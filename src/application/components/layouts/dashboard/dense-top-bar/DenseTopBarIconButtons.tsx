import styled, { css } from "styled-components"
import { Icon } from "@/application/components/icon/Icon"
import { useEvent } from "effector-react"
import { toggleBlueLayoutMobileMenuVisibility } from "@/application/components/layouts/dashboard/menu/blue-layout.mobile-menu"

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconStyles = css`
  cursor: pointer;
  fill: #4858CC;
  width: 28px;
  height: 28px;
  @media screen and (max-width: 768px) {
    fill: #fff;
    width: 36px;
    height: 36px;
  }
  @media screen and (max-width: 480px) {
    margin-left: 16px;
    width: 24px;
    height: 24px;
  }
`

const Notification = styled(Icon).attrs({ name: `notification` })`
  margin-left: 36px;
  ${IconStyles}
`

const User = styled(Icon).attrs({ name: `user` })`
  margin-left: 32px;
  @media screen and (max-width: 768px) {
    margin-left: 24px;
  }
  ${IconStyles}
`

const Burger = styled(Icon).attrs({ name: `burger` })`
  margin-left: 24px;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  ${IconStyles}
`

export const DenseTopBarIconButtons = () => {
  const showMobileMenu = useEvent(toggleBlueLayoutMobileMenuVisibility)

  return (
    <Wrapper>
      <Notification />
      <User />
      <Burger onClick={() => showMobileMenu()} />
    </Wrapper>
  )
}
