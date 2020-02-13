import * as React from "react"
import styled from 'styled-components'

const Button = styled.button`
  outline: none;
  border: none;
  color: red;
`

const Block = styled.div`
  color: black;
  
  ${Button} {
    color: green;
  }
`


type IndexPageProps = {
  children: React.ReactNode
}

export const IndexPage = ({ children }: IndexPageProps) => (
  <Block>
    <Button>ASD</Button>
    index page
    {children}
  </Block>
)
