export const routeNames = {
  landing: () => `/`,
  search: () => `/search`,
  searchCoachPage: (id: string) => `/search/coach/${id}`,

  login: () => `/auth/login`,
  signup: (step: string) => `/auth/signup/${step}`,
  recovery: () => `/auth/recovery`,
  resetPassword: (token: string) => `/reset-password/${token}`,

  client: () => `/client`,
  clientNotifications: () => '/client/notifications-page',
  clientSession: (id: string) => `/client/sessions/${id}`,
  clientProfile: () => `/client/profile`,
  clientWallet: () => `/client/wallet`,
  clientProfileEdit: () => `/client/profile/edit`,
  clientSettings: () => `/client/settings`,
  clientChatsList: () => `/client/chats`,
  clientChat: (id: string) => `/client/chats/${id}`,
  clientSupport: () => `/client/support`,

  coach: () => `/coach`,
  coachSupport: () => `/coach/support`,
  coachNotifications: () => '/coach/notifications',
  coachProfile: () => `/coach/profile`,
  coachSessionsHistory: () => `/coach/profile/sessions-history`,
  coachProfileEdit: () => `/coach/profile/edit`,
  coachClients: () => `/coach/clients`,
  coachClientProfile: (id: string) => `/coach/client/${id}`,
  coachWallet: () => `/coach/wallet`,
  coachSettings: () => `/coach/settings`,
  coachSchedule: () => `/coach/schedule`,
  coachBlocked: () => `/coach/blocked`,
  coachSession: (id: string) => `/coach/sessions/${id}`,
  coachChat: (id: string) => `/coach/chats/${id}`,
}
