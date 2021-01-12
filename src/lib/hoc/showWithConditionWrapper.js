import * as React from "react"

export const showWithConditionWrapper = (condition) => {
  return ({children}) => condition ? children : <></>
}