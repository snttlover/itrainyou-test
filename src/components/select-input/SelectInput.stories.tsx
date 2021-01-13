import { FormItem } from "../form-item/FormItem"
import { SelectInput } from "./SelectInput"
import * as React from "react"
import { useState } from "react"
import styled from "styled-components"

export default {
  component: SelectInput,
  title: "SelectInput"
}

const Container = styled.div`
  width: 500px;
`

export const normal = () => {
  const [value, change] = useState("")

  return (
    <Container>
      <SelectInput
        placeholder='placeholder'
        value={value}
        options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
        onChange={change}
      />
    </Container>
  )
}

export const asFormItem = () => {
  const [value, change] = useState("")

  return (
    <Container>
      <FormItem label='Sex'>
        <SelectInput
          placeholder='placeholder'
          value={value}
          options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
          onChange={change}
        />
      </FormItem>
    </Container>
  )
}
