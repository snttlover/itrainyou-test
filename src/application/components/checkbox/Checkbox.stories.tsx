import * as React from "react"
import { Checkbox } from "./Checkbox"
import { useState } from "react"

export default {
  component: Checkbox,
  title: "Checkbox"
}

export const normal = () => {
  const [checked, change] = useState(false)

  return (
    <Checkbox value={checked} onChange={change}>
      Контент
    </Checkbox>
  )
}
