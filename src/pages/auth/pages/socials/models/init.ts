import { $isSocialSignupInProgress, loggedIn, setIsSocialSignupInProgress } from "@/feature/user/user.model"
import { navigatePush } from "@/feature/navigation"
import { routeNames } from "@/pages/route-names"
import { createEvent } from "effector"
import { combine, forward, guard, merge, sample, split, attach} from "effector-root"
import {
  RegisterAsUserFromSocialsResponseFound,
  RegisterAsUserFromSocialsResponseNotFound
} from "@/lib/api/auth-socials"
import {
  $socialNetwork,
  authWithSocialNetwork,
  createUserFromSocialsFx,
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
  checkEmailFx,
  checkPhoneFx,
  $socialsForm,
  setEmailError,
  setPhoneError,
} from "@/pages/auth/pages/socials/models/units"
import { SocialNetwork } from "@/pages/auth/pages/socials/models/types"
import { UserData } from "@/pages/auth/pages/signup/models/types"
import { userDataSetWithSocials } from "@/pages/auth/pages/signup/models/units"
import { step3FormSubmitted, $emailError, $phoneError } from "@/pages/auth/pages/signup/content/step-3/step3.model"
import { combineEvents } from "patronum"

$socialNetwork.on(socialNetworkDataFx.doneData, (state, payload) =>
  ({ name: payload.name, accessToken: payload.accessToken, email: payload.email }))
  .reset(reset)


forward({
  from: socialNetworkDataFx.doneData,
  to: loggedIn,
})

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
      clientData: { ...response.data, email, priceRanges: []},
      categories: [],
      coachData: {
        workExperience: "",
        education: "",
        description: "",
        photos: [],
        videoInterview: "",
        inn: "",
        legalForm: "",
        socialNetworks: "",
        supervisions: ""
      }
    }
  },
  target: userDataSetWithSocials,
})


const socialNetworkGuardedUpdated = guard({
  source: $socialNetwork.updates,
  filter: socialNetwork => socialNetwork.accessToken.length > 0,
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
  to: [deleteSocialNetworkNameFx, reset],
})

forward({
  from: socialsGate.open,
  to: setIsSocialSignupInProgress.prepend(() => false)
})

forward({
  from: createUserFromSocialsFx.doneData.map(data => ({ token: data.token })),
  to: loggedIn,
})

forward({
  from: createUserFromSocialsFx.done.map(() => false),
  to: setIsSocialSignupInProgress,
})

guard({
  source: step3FormSubmitted,
  filter: combine($isSocialSignupInProgress, (inProgress) => inProgress),
  target: attach({
    effect: checkEmailFx,
    source: $socialsForm,
  })
})

forward({
  from: checkEmailFx.doneData.filter({
    fn: (response) => response.isReserved,
  }),
  to: setEmailError.prepend(() => { return "Эта почта занята другим пользователем" }),
})

$emailError.on(setEmailError,(state,payload) => payload)

guard({
  source: step3FormSubmitted,
  filter: combine($isSocialSignupInProgress, (inProgress) => inProgress),
  target: attach({
    effect: checkPhoneFx,
    source: $socialsForm,
  })
})

forward({
  from: checkPhoneFx.doneData.filter({
    fn: (response) => response.isReserved,
  }),
  to: setPhoneError.prepend(() => { return "Этот телефон занят другим пользователем" }),
})

$phoneError.on(setPhoneError,(state,payload) => payload)

guard({
  source: { phoneError: $phoneError, emailError: $emailError },
  clock: combineEvents({ events: [checkPhoneFx.doneData, checkEmailFx.doneData] }),
  filter: ({ phoneError, emailError }) => !phoneError && !emailError,
  target: navigatePush.prepend(() => ({ url: routeNames.signup("4") })),
})