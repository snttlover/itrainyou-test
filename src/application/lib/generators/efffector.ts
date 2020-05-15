import { combine, createEvent, createStore, Event, Store } from "effector-next"
type Options<T, R> = {
  defaultValue: T
  validator?: (value: R) => string | null
  validatorEnhancer?: (store: Store<T>) => Store<R>
  eventMapper?: (event: Event<T>) => Event<T>
}

export const createEffectorField = <T, R = T>(
  options: Options<T, R>
): [Store<T>, Event<T>, Store<string | false | null>, Store<boolean>] => {
  if (!options.eventMapper) {
    options.eventMapper = event => event
  }
  if (!options.validatorEnhancer) {
    // @ts-ignore
    options.validatorEnhancer = (store: Store<T>): Store<R> => store
  }
  if (!options.validator) {
    options.validator = () => null
  }
  const changeEvent = createEvent<T>()
  const $isDirty = createStore(false).on(changeEvent, () => true)
  const $store = createStore(options.defaultValue).on(options.eventMapper(changeEvent), (_, payload) => payload)
  const $error = combine(
    options.validatorEnhancer($store).map(options.validator),
    $isDirty,
    (error, isDirty) => isDirty && error
  )
  const $isCorrect = $error.map(value => !value)

  return [$store, changeEvent, $error, $isCorrect]
}

type _U<T> = T extends Store<infer U> ? U : T
export type UnpackedStoreObjectType<T> = _U<_U<T>>
