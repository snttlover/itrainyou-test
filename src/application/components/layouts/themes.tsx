import React from "react"
import { ThemeProvider } from "styled-components"

export const clientTheme = {
  colors: {
    primary: `#4858CC`,
    primaryDarker: `#3746B0`,
  },
}

const coachTheme: typeof clientTheme = {
  colors: {
    primary: `#7D36A8`,
    primaryDarker: `#7D36A8`,
  },
}

type ProviderTypes = {
  children: React.ReactChild
}

const theme = (theme: typeof clientTheme) => ({ children }: ProviderTypes) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export const ClientTheme = theme(clientTheme)
export const CoachTheme = theme(coachTheme)
