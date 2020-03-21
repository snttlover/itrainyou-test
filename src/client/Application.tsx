import { AsyncDataLoader } from "@/client/AsyncDataLoader"
import { App } from "@app/App"
import { LocationProvider, History } from "@reach/router"
import { Provider } from "effector-react/ssr"
import { Scope } from "effector/fork"
import * as React from "react"
import { hot } from "react-hot-loader"

type ApplicationClientEntryProps = {
  scope: Scope
  history: History
}

const ApplicationClientEntry = ({ scope, history }: ApplicationClientEntryProps) => (
  <LocationProvider history={history}>
    <Provider value={scope}>
      <AsyncDataLoader history={history} scope={scope}>
        <App />
      </AsyncDataLoader>
    </Provider>
  </LocationProvider>
)

export const Application = hot(module)(ApplicationClientEntry)
