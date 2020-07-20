export const routeNames = {
  landing: () => `/`,
  search: () => `/search`,
  searchCoachPage: (id: string) => `/search/coach/${id}`,

  login: () => `/auth/login`,
  signup: (step: string) => `/auth/signup/${step}`,
  recovery: () => `/auth/recovery`,
  resetPassword: (token: string) => `/reset-password/${token}`,

  client: () => `/client`,
  clientSession: () => `/client/session`,
  clientProfile: () => `/client/profile`,
  clientSettings: () => `/client/settings`,
  clientChatsList: () => `/client/chats`,
  clientChat: (id: string) => `/client/chats/${id}`,

  coach: () => `/coach`,
  coachClients: () => `/coach/clients`,
  coachWallet: () => `/coach/wallet`,
  coachSettings: () => `/coach/settings`,
  coachSupport: () => `/coach/support`,
  coachSchedule: () => `/coach/schedule`,
  coachBlocked: () => `/coach/blocked`,
  coachChat: (id: string) => `/coach/chats/${id}`,
}
