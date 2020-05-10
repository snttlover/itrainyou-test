import { useClickOutside } from "@/application/components/click-outside/use-click-outside"
import * as React from "react"
import { useRef } from "react"

type ClickOutsidePropTypes = {
  children: React.ReactElement | React.ReactElement[]
  onClickOutside: () => void
}

export const ClickOutside = (props: ClickOutsidePropTypes) => {
  const ref = useRef(null)
  useClickOutside(ref, props.onClickOutside)

  return (
    <React.Fragment>
      {React.Children.map(props.children, (child, key) => {
        return React.cloneElement(child, {
          key,
          ref
        })
      })}
    </React.Fragment>
  )
}
