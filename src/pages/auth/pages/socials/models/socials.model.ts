import { setIsSocialSignupInProgress } from "@/feature/user/user.model"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { forward, guard, merge, sample, split } from "effector-root"
import {
  RegisterAsUserFromSocialsResponseFound,
  RegisterAsUserFromSocialsResponseNotFound
} from "@/lib/api/auth-socials"
import {
  $socialNetwork,
  authWithSocialNetwork,
  deleteSocialNetworkNameFx,
  registerWithFacebookFx,
  registerWithGoogleFx,
  registerWithVkFx,
  reportUnknownTypeFx,
  reset,
  saveSocialNetworkNameFx,
  signUpWithSocialsPageGate,
  socialNetworkDataFx,
  socialsGate,
  userFound,
  userNotFound,
  createUserFromSocialsFx
} from "@/pages/auth/pages/socials/models/init"
import { SocialNetwork } from "@/pages/auth/pages/socials/models/types"
import { loggedIn } from "@/feature/user/user.model"
import { UserData } from "@/pages/auth/pages/signup/models/types"
import { userDataSetWithSocials } from "@/pages/auth/pages/signup/models/init"


forward({
  from: signUpWithSocialsPageGate.open,
  to: socialNetworkDataFx,
})


forward({
  from: authWithSocialNetwork,
  to: saveSocialNetworkNameFx,
})

const merged = merge([registerWithVkFx.doneData, registerWithFacebookFx.doneData, registerWithGoogleFx.doneData])

split({
  source: merged,
  match: {
    userFound: response => response.status === "USER_FOUND",
    userNotFound: response => response.status === "USER_NOT_FOUND",
  },
  cases: {
    userFound: userFound.prepend((response: RegisterAsUserFromSocialsResponseFound) =>
      ({ token: response.data.token, user: response.data.user })
    ),
    userNotFound: userNotFound,
    __: reportUnknownTypeFx,
  },
})

forward({
  from: userNotFound.map(() => true),
  to: setIsSocialSignupInProgress,
})

forward({
  from: userNotFound.map(() => ({ url: routeNames.signup("2") })),
  to: navigatePush,
})

sample({
  source: $socialNetwork,
  clock: userNotFound,
  fn: (socialNetwork: SocialNetwork, response: RegisterAsUserFromSocialsResponseNotFound): UserData => {
    const email = response.data.email || socialNetwork.email
    return {
      type: "client",
      clientData: { ...response.data, email },
      categories: [],
      coachData: {
        workExperience: "",
        education: "",
        description: "",
        phone: "",
        photos: [],
        videoInterview: ""
      }
    }
  },
  target: userDataSetWithSocials,
})


const socialNetworkGuardedUpdated = guard({
  source: $socialNetwork.updates,
  filter: socialNetwork => socialNetwork.accessToken  !== null,
})


split({
  source: socialNetworkGuardedUpdated,
  match: {
    vK: socialNetwork => socialNetwork.name === "vk",
    faceBook: socialNetwork => socialNetwork.name === "facebook",
    google: socialNetwork => socialNetwork.name === "google",
  },
  cases: {
    vK: registerWithVkFx.prepend((socialNetwork: SocialNetwork) => socialNetwork.accessToken),

    faceBook: registerWithFacebookFx.prepend((socialNetwork: SocialNetwork) => socialNetwork.accessToken),

    google: registerWithGoogleFx.prepend((socialNetwork: SocialNetwork) => socialNetwork.accessToken),

    __: reportUnknownTypeFx,
  },
})

forward({
  from: socialsGate.open,
  to: [deleteSocialNetworkNameFx, reset]
})

forward({
  from: createUserFromSocialsFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

/*forward({
  from: createUserFromSocialsFx.done.map(() => false),
  to: setIsSocialSignupInProgress,
})

forward({
  from: createUserFromSocialsFx.doneData.map(() => ({ url: routeNames.signup("4") })),
  to: navigatePush,
})

sample({
  source: $socialsForm,
  clock: guard({
    source: registerStep4Merged,
    filter: combine($socialNetwork, (socials) => socials.name !== null),
  }),
  target: createUserFromSocialsFx,
})

sample({
  source: combine({ url: routeNames.signup("4") }),
  clock: guard({
    source: registerStep3FormSubmitted,
    filter: combine($socialNetwork, (socials) => socials.name === null),
  }),
  target: navigatePush,
})*/

