import { AuthLayoutLogo } from "@/application/components/layouts/auth/AuthLayoutLogo"
import * as React from "react"
import styled from "styled-components"

const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  background: #fff; 
`

const AuthContainer = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`

type Step4ClientLayoutProps = {
  children: React.ReactNode
}

export const Step4ClientLayout = (props: Step4ClientLayoutProps) => (
  <StyledLayout>
    <AuthContainer>
      <AuthLayoutLogo />
      {props.children}
    </AuthContainer>
  </StyledLayout>
)
