import * as React from "react"
import styled, { css } from "styled-components"

type ButtonSize = "small" | "medium" | "large"

const smallSizeStyles = css`
  font-size: 14px;
  line-height: 22px;
  padding: 5px 20px;
`

const mediumSizeStyles = css`
  font-size: 14px;
  line-height: 22px;
  padding: 8px 24px;
`

const largeSizeStyles = css`
  font-size: 16px;
  line-height: 24px;
  padding: 12px 24px;
`

type ButtonColors = "primary" | "secondary" | "transparent" | "white"

const primaryColorStyles = css`
  background: ${props => props.theme.colors.primary};
  color: #fff;

  &:not(:disabled) {
    &:active,
    &:hover {
      background: ${props => props.theme.colors.primary};
    }
  }
  &:disabled {
    background: ${props => props.theme.colors.primaryLight};
  }
`

const secondaryColorStyles = css`
  background: ${props => props.theme.colors.primaryLighter};
  color: ${props => props.theme.colors.primary};

  &:not(:disabled) {
    &:active,
    &:hover {
      background: ${props => props.theme.colors.primaryLight};
    }
  }
  &:disabled {
    color: ${props => props.theme.colors.primaryLight};
  }
`

const transparentColorStyles = css`
  color: ${props => props.theme.colors.primary};
  background: transparent;

  &:not(:disabled) {
    &:active,
    &:hover {
      background: ${props => props.theme.colors.primaryDarker};
    }
  }
  &:disabled {
    background: ${props => props.theme.colors.primaryLight};
  }
`

const whiteColorStyles = css`
  background: #fff;
  color: ${props => props.theme.colors.primary};

  &:not(:disabled) {
    &:active,
    &:hover {
      color: ${props => props.theme.colors.primaryDarker};
    }
  }
  &:disabled {
    color: ${props => props.theme.colors.primaryLighter};
  }
`

type ButtonTypes = {
  size: ButtonSize
  color: ButtonColors
}

// large size by default
// primary color by default
export const Button = styled.button<ButtonTypes>`
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  text-align: center;
  border-radius: 24px;
  border: none;
  outline: none;
  cursor: pointer;

  ${props => {
    switch (props.size) {
      case "small":
        return smallSizeStyles
      case "large":
        return largeSizeStyles
      case "medium":
      default:
        return mediumSizeStyles
    }
  }}

  ${props => {
    switch (props.color) {
      case "white":
        return whiteColorStyles
      case "secondary":
        return secondaryColorStyles
      case "transparent":
        return transparentColorStyles
      case "primary":
      default:
        return primaryColorStyles
    }
  }}
`
