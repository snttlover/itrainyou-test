declare module "*.svg" {
  const content: string;
  export default content;
}

namespace NodeJS {
  interface Process {
    isServer?: boolean
  }
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
  }
}

interface Window {
  __initialState__: any
}
