import * as React from "react"
import { SyntheticEvent, useEffect } from "react"

type ClickOutsidePropTypes = {
  children: React.ReactElement | React.ReactElement[]
  onClickOutside: () => void
}

export const ClickOutside = (props: ClickOutsidePropTypes) => {
  const blurHandler = () => props.onClickOutside()

  useEffect(() => {
    document.addEventListener(`click`, blurHandler)
    return () => {
      document.removeEventListener(`click`, blurHandler)
    }
  })

  const focusHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  return (
    <React.Fragment>
      {React.Children.map(props.children, (child, key) => {
        return React.cloneElement(child, {
          onClick: focusHandler,
          key
        })
      })}
    </React.Fragment>
  )
}
