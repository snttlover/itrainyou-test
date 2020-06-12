import styled from "styled-components"
import { logout } from "@/application/feature/user/user.model"

const StyledLogoutButton = styled.div`
  color: #ff6b00;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin-top: 32px;
`

export const LogoutButton = () => <StyledLogoutButton onClick={() => logout()}>Выйти</StyledLogoutButton>
