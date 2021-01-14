import * as React from "react"

type ChildrenTypes = {
  children: React.ReactChild | React.ReactChild[]
}

export const showWithConditionWrapper = (condition: boolean) => {
  return ({children}: any) => condition ? children : <></>
}