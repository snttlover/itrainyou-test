import { allSettled } from "effector/fork"
import * as React from "react"
import { useStore } from "effector-react/ssr"
import Helmet from "react-helmet"
import { AsyncDataOptions } from "../../routes"
import { $userName, loadUser } from "./model"

export const UserPage = () => {
  const name = useStore($userName)

  return (
    <>
      <Helmet>
        <title>User: {name}</title>
      </Helmet>
      <div>{name}</div>
    </>
  )
}

UserPage.asyncData = async ({ scope, params }: AsyncDataOptions<{ id: string }>) => {
  await allSettled(loadUser, {
    scope,
    params: params.id
  })
}
