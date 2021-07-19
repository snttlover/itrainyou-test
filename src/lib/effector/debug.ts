import { root } from "effector-root"

const domain = root

const IGNORE_LIST = ["$tickTime", "changeTickTime"]

export const enableDebugger = () => {
  domain.onCreateStore((store) => {
    store.updates.watch((value) => {
      if (!IGNORE_LIST.includes(store.shortName)) {
        console.log(`STORE ${store.shortName} UPDATED`, value)
      }
    })
  })

  domain.onCreateEvent((event) => {
    event.watch((parameters) => {
      if (!IGNORE_LIST.includes(event.shortName)) {
        console.log(`EVENT ${event.shortName} TRIGGERED`, parameters)
      }
    })
  })

  domain.onCreateEffect((effect) => {
    effect.watch((parameters) => {
      if (!IGNORE_LIST.includes(effect.shortName)) {
        console.log(`EFFECT ${effect.shortName} TRIGGERED`, parameters)
      }
    })

    effect.done.watch((parameters) => {
      if (!IGNORE_LIST.includes(effect.shortName)) {
        console.log(`EFFECT ${effect.shortName} DONE`, parameters)
      }
    })

    effect.fail.watch((parameters) => {
      if (!IGNORE_LIST.includes(effect.shortName)) {
        console.log(`EFFECT ${effect.shortName} FAIL`, parameters)
      }
    })
  })
}
