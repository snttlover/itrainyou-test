declare module "*.svg" {
  const content: string
  export default content
}

declare namespace NodeJS {
  interface Process extends EventEmitter {
    env: ProcessEnv
  }

  interface ProcessEnv {
    [key: string]: string | undefined
    RAZZLE_ASSETS_MANIFEST: string
    RAZZLE_PUBLIC_DIR: string
    BUILD_TARGET: "client" | "server"
  }
}

declare interface NodeModule {
  hot: {
    accept(path?: string, cb?: () => void): void
  }
}

declare interface Window {
  INITIAL_STATE: {}
  env: {
    [key: string]: string
  }
}
