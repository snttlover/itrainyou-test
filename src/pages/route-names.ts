export const routeNames = {
  landing: () => `/`,
  search: () => `/search`,
  searchCoachPage: (id: string) => `/search/coach/${id}`,
  login: () => `/auth/login`,
  signup: (step: string) => `/auth/signup/${step}`,
  client: () => `/client`,
  coach: () => `/coach`,
}
