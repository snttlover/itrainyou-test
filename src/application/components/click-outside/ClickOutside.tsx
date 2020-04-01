import * as React from "react"
import { SyntheticEvent, useEffect } from "react"
import { createEvent, createStore } from "effector"
import { useEvent, useStore } from "effector-react"

type ClickOutsidePropTypes = {
  children: React.ReactElement | React.ReactElement[]
  onClickOutside: () => void
}

export const ClickOutside = (props: ClickOutsidePropTypes) => {
  const addNode = createEvent<Element>()
  const $nodes = createStore<Element[]>([])
    .on(addNode, (nodes, node) => [...nodes.filter(node => !!node), node])

  const blurHandler = (event: MouseEvent & any) => {
    const path = event.path || (event.composedPath && event.composedPath())
    for (const pathEl of path) {
      for (const node of $nodes.getState()) {
        if (node === pathEl) {
          return
        }
      }
    }
    props.onClickOutside()
  }

  useEffect(() => {
    document.addEventListener(`click`, blurHandler)
    return () => {
      document.removeEventListener(`click`, blurHandler)
    }
  })

  return (
    <React.Fragment>
      {React.Children.map(props.children, (child, key) => {
        return React.cloneElement(child, {
          key,
          ref: addNode
        })
      })}
    </React.Fragment>
  )
}
