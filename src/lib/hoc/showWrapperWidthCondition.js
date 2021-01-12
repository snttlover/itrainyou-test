import * as React from "react"

export const showWrapperWidthCondition = (condition) => {
  return ({children}) => condition ? children : <></>
}