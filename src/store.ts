import { createDomain } from "effector"

export const universal = createDomain('universal')
universal.onCreateStore(store => {
  // @ts-ignore
  if (process.browser && typeof window !== 'undefined') {
    // @ts-ignore
    const { universalStoresMap } = window.__NEXT_DATA__.props
    if (universalStoresMap[store.sid]) {
      store.defaultState = universalStoresMap[store.sid]
      store.setState(universalStoresMap[store.sid])
    }
  }
})

export const createUniversalStore = universal.createStore;
