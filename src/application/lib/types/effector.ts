import { Store } from "effector"

export type InferStoreType<T extends Store<any>> = T extends Store<infer U> ? U : never
