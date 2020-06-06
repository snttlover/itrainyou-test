import {clientTheme} from "@/application/components/layouts/themes"

declare module "*.svg" {
  const content: string
  export default content
}
declare namespace NodeJS {
  interface Process extends EventEmitter {
    browser: boolean
    env: ProcessEnv
  }

  interface ProcessEnv {
    [key: string]: string | undefined
  }
}

/// <reference types="next" />
/// <reference types="next/types/global" />

import "styled-components"

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends (typeof clientTheme) {}
}
