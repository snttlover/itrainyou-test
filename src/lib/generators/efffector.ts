import { combine, createEvent, createStore, Event, Store } from "effector-root"
import { delay } from "patronum/delay"
import { persist } from "effector-storage/local"

type Options<T, R> = {
  defaultValue: T
  storageSaveKey?: string
  validator?: (value: R) => string | null
  validatorEnhancer?: (store: Store<T>) => Store<R>
  eventMapper?: (event: Event<T>) => Event<T>
  reset?: Event<any>
}

type EffectorFabricOptions = { sid: string; name: string }

export const createEffectorField = <T, R = T>(
  options: Options<T, R>,
  effectorFabricOptions?: EffectorFabricOptions
): [Store<T>, Event<T>, Store<string | null>, Store<boolean>] => {
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
  const $store = createStore(options.defaultValue, effectorFabricOptions).on(
    options.eventMapper(changeEvent),
    (_, payload) => payload
  )

  const $isDirty = createStore(false).on($store, () => true)
  const $error = options.validatorEnhancer($store).map(options.validator)
  const $isCorrect = $error.map(value => !value)

  const $errorMessage = combine(
    $error,
    $isDirty,
    $store,
    (error, isDirty) => (isDirty && error) || null
  )

  if (options.reset) {
    $store.reset(options.reset)
    $isDirty.reset(delay({ source: options.reset, timeout: 1 }))
    $errorMessage.reset(options.reset)
  }

  if (options.storageSaveKey) {
    persist({
      store: $store,
      key: options.storageSaveKey
    })
  }

  return [$store, changeEvent, $errorMessage, $isCorrect]
}

type _U<T> = T extends Store<infer U> ? U : T
export type UnpackedStoreObjectType<T> = _U<_U<T>>
