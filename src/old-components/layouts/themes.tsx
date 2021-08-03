import * as React from "react"
import { ThemeProvider } from "styled-components"

export const clientTheme = {
  type: "client",
  colors: {
    primaryBackground: "#D3D7F3",
    primary: "#4858CC",
    primaryDarker: "#3746B0",
    primaryLight: "#D3D7F3",
    primaryLighter: "#F8F8FD",
    invert: {
      primary: "#783D9D",
    },
  },
}

const coachTheme: typeof clientTheme = {
  type: "coach",
  colors: {
    primaryBackground: "#DFD0E7",
    primary: "#783D9D",
    primaryDarker: "#783D9D",
    primaryLight: "#DFD0E7",
    primaryLighter: "#F4EFF7",
    invert: {
      primary: "#4858CC",
    },
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
