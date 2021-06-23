let dataSource: any = typeof window === "undefined" ? process : window

if (!dataSource.env) {
  dataSource = { env: {}}
}

export const config = {
  BACKEND_URL: dataSource.env.BACKEND_URL,
  WS_HOST: dataSource.env.WS_HOST,
  AGORA_ID: dataSource.env.AGORA_ID,
  SENTRY_CLIENT_DSN: dataSource.env.SENTRY_CLIENT_DSN,
  SENTRY_SERVER_DSN: dataSource.env.SENTRY_SERVER_DSN,
  FACEBOOK_CLIENT_ID: dataSource.env.FACEBOOK_CLIENT_ID,
  VK_CLIENT_ID: dataSource.env.VK_CLIENT_ID,
  GOOGLE_CLIENT_ID: dataSource.env.GOOGLE_CLIENT_ID,
  ENVIRONMENT: dataSource.env.ENVIRONMENT,
  SERVER_DEFAULT_PAYMENT_SYSTEM: dataSource.env.SERVER_DEFAULT_PAYMENT_SYSTEM,
  JIVO_ID: dataSource.env.JIVO_ID,
  YANDEX_METRIKA_ID: dataSource.env.YANDEX_METRIKA_ID
}
