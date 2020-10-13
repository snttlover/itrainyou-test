let dataSource: any = typeof window === "undefined" ? process : window

if (!dataSource.env) {
  dataSource = { env: {}}
}

export const config = {
  BACKEND_URL: dataSource.env.BACKEND_URL,
  WS_HOST: dataSource.env.WS_HOST,
  AGORA_ID: dataSource.env.AGORA_ID
}
