import { Store } from "effector-root"

export type InferStoreType<T extends Store<any>> = T extends Store<infer U> ? U : never
