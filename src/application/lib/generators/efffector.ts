import { Domain, Event, Store } from "effector"

type Options<T> = {
  domain: Domain
  defaultValue: T
  validator: (value: T) => string | null
  eventMapper?: (event: Event<T>) => Event<T>
}

export const createEffectorField = <T>({
  domain,
  defaultValue,
  validator,
  eventMapper = event => event
}: Options<T>): [Store<T>, Event<T>, Store<string | null>, Store<boolean>] => {
  const changeEvent = domain.createEvent<T>()
  const $store = domain.createStore(defaultValue).on(eventMapper(changeEvent), (_, payload) => payload)
  const $error = $store.map(validator)
  const $isCorrect = $error.map(value => !value)

  return [$store, changeEvent, $error, $isCorrect]
}


type _U<T> = T extends Store<infer U> ? U : T
export type UnpackedStoreObjectType<T> = _U<_U<T>>
