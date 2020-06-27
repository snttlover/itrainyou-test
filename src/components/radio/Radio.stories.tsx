import * as React from "react"
import { RadioGroup, RadioOption } from "./Radio"
import { useState } from "react"

export default {
  title: "Radio"
}

const radioItems = [
  {
    id: 1,
    text: "First"
  },
  {
    id: 2,
    text: "Second"
  }
]

export const normal = () => {
  const [value, change] = useState(0)

  return (
    <RadioGroup value={value} onChange={change} name='someName'>
      {radioItems.map(item => (
        <RadioOption key={item.id} value={item.id}>
          {item.text}
        </RadioOption>
      ))}
    </RadioGroup>
  )
}
