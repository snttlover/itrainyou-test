export type SocialNetworkNameType = "vk" | "google" | "facebook" | null
export type SocialNetwork = {
  accessToken: string
  name: SocialNetworkNameType
  email: string
}
export const SOCIAL_NETWORK_SAVE_KEY = "__social-data__"