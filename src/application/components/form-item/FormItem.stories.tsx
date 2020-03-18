import * as React from "react"
import { Input } from "../input/Input"
import { FormItem } from "./FormItem"
import styled from "styled-components"

export default {
  component: FormItem,
  title: "Form item"
}

const Container = styled.div`
  width: 300px;
`

export const exampleWithInput = () => (
  <Container>
    <FormItem label='label'>
      <Input value='some value' />
    </FormItem>
  </Container>
)

export const exampleWithInputError = () => (
  <Container>
    <FormItem label='label' error='Неверный текст'>
      <Input value='Текст' />
    </FormItem>
  </Container>
)
