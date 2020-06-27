export const routeNames = {
  landing: () => `/`,
  search: () => `/search`,
  searchCoachPage: (id: string) => `/search/coach/${id}`,
  login: () => `/auth/login`,
  signup: (step: string) => `/auth/signup/${step}`,

  client: () => `/client`,
  clientProfile: () => `/client/profile`,
  clientSettings: () => `/client/settings`,

  coach: () => `/coach`,
  coachClients: () => `/coach/clients`,
  coachWallet: () => `/coach/wallet`,
  coachSettings: () => `/coach/settings`,
  coachSupport: () => `/coach/support`,
  coachSchedule: () => `/coach/schedule`,
  coachBlocked: () => `/coach/blocked`,
}
