import { logout } from "@/lib/network/token"
import { useEvent } from "effector-react/ssr"
import * as React from "react"
import styled from "styled-components"

const StyledLogoutButton = styled.div`
  color: #ff6b00;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin-top: 32px;
  cursor: pointer;
`

export const LogoutButton = () => {
  const _logout = useEvent(logout)
  return <StyledLogoutButton onClick={() => _logout()}>Выйти</StyledLogoutButton>
}
