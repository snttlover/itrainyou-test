import React from 'react'
import styled from "styled-components"
import { Icon } from "@/components/icon/Icon"

export const Social = ({ name }) => {
  const CurrentIcon = styled(Icon).attrs({ name: `${name}-login` })`
    margin: 0 8px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  `
  return (
    <>
      <CurrentIcon />
    </>
  )
}