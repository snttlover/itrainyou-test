import * as React from "react"
import styled, { css } from "styled-components"

type TextPropsTypes = {
  tag?: keyof React.ElementType

  small?: boolean,
  medium?: boolean,
  large?: boolean

  children?: React.ReactNode | React.ReactNode[]
}

const defaultTag = "p"

const small = css`
  font-size: 10px;
`

const medium = css`
  font-size: 20px;
`

const large = css`
  font-size: 30px;
`

const StyledText = styled.div<TextPropsTypes>`
  ${props => props.small && small}
  ${props =>props.medium && medium}
  ${props => props.large && large}
`

export const Text = (props: TextPropsTypes) => <StyledText as={props.tag || defaultTag} {...props}>{props.children}</StyledText>
