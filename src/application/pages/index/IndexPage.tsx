import {useStore} from 'effector-react/ssr'
import * as React from "react"
import styled from "styled-components"
import {$isServer} from '../../store'

const Block = styled.div`
  color: black;
`

type IndexPageProps = {
  children: React.ReactNode
}

export const IndexPage = ({ children }: IndexPageProps) => {
  const isServer = useStore($isServer)
  return <Block>{isServer ? "Server" : "Client"}</Block>
}
