import { getMyClient, Client } from "@/application/lib/api/client"
import dayjs from "dayjs"
import { combine, createEffect, createEvent, createStore, forward, sample } from "effector-next"

export const loadProfileFx = createEffect({
  handler: getMyClient,
})

export const mounted = createEvent()

const $profile = createStore<Partial<Client>>({}).on(loadProfileFx.doneData, (state, payload) => payload)

export const $pageProfile = $profile.map(profile => ({
  ...profile,
  avatar: profile.avatar || null,
  age: dayjs(+new Date())
    .subtract(dayjs(profile?.birthDate).get('year'), 'year')
    .get(`year`),
}))

forward({
  from: mounted,
  to: [loadProfileFx],
})
