import * as React from "react"
import { ThemeProvider } from "styled-components"

export const clientTheme = {
  colors: {
    primaryBackground: "#D3D7F3",
    primary: "#4858CC",
    primaryDarker: "#3746B0",
    invert: {
      primary: "#7D36A8",
    }
  },
}

const coachTheme: typeof clientTheme = {
  colors: {
    primaryBackground: "#E0CFEA",
    primary: "#7D36A8",
    primaryDarker: "#7D36A8",
    invert: {
      primary: "#4858CC",
    }
  },
}

type ProviderTypes = {
  children: React.ReactChild | React.ReactChild[]
}

const theme = (theme: typeof clientTheme) => ({ children }: ProviderTypes) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const ClientTheme = theme(clientTheme)
export const CoachTheme = theme(coachTheme)
