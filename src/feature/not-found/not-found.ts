import { createEvent, createStore, Effect, Event, forward } from "effector-root"
import { AxiosError } from "axios"

type createNotFoundModuleConfigTypes = {
  reset?: Event<void>
  effect: Effect<any, any>
}

export const createNotFoundModule = (config: createNotFoundModuleConfigTypes) => {
  const changeNotFound = createEvent<boolean>()

  const $isNotFound = createStore(false)
    .on(changeNotFound, (_, status) => status)

  if (config.reset) {
    $isNotFound.reset(config.reset)
  }

  forward({
    from: config.effect.failData.filterMap(error => ((error as AxiosError)?.response?.status === 404 ? true : false)),
    to: changeNotFound,
  })

  return {
    $isNotFound
  }
}
