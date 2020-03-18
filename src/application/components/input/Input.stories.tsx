import * as React from "react"
import { Input } from "./Input"
import { useState } from "react"

export default {
  component: Input,
  title: "Input"
}

export const normal = () => {
  const [value, change] = useState(``)
  const placeholder = `Type some text...`

  return (
    <Input value={value} placeholder={placeholder} onChange={change} />
  )
}

export const errored = () => {
  const [value, change] = useState(`123`)
  const placeholder = `Type some text...`

  return (
    <Input value={value} placeholder={placeholder} onChange={change} error />
  )
}
