import React, { useEffect, useState } from "react"
import styled from "styled-components"

import arrowIcon from "../../../assets/features/arrow-down.svg"

const Container = styled.div<{ active: boolean; desktopDescrPaddingRight: number }>`
  position: relative;
  padding-left: 20px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 33px;
  }

  h3 {
    width: 278px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #ffffff;
    margin-bottom: ${props => (props.active ? "16px" : "0px")};
  }

  p {
    width: 328px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    padding-right: ${props => (props.desktopDescrPaddingRight ? props.desktopDescrPaddingRight + "px" : "0px")};
  }
`

const Progress = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;

  &::after {
    position: absolute;
    content: "";
    width: 4px;
    height: ${props => (props.progress ? props.progress : "0")}%;
    left: 0px;
    top: 0px;
    background: #ffffff;
    border-radius: 8px;
  }
`

const Arrow = styled.i<{ reverse: boolean }>`
  display: block;
  position: absolute;
  top: 8px;
  right: 5px;
  width: 14px;
  height: 8px;
  background: url("${arrowIcon}");
  transform: rotate(${props => (props.reverse ? "0deg" : "180deg")});
`

type NavItemProps = {
  index: number
  id: number
  title: string
  descr: string
  isActive: boolean
  userReachedBlock: boolean
  goToNext: any
  setActive: any
  desktopDescrPaddingRight: number
}

export const NavItem = ({
  index,
  id,
  title,
  descr,
  isActive,
  userReachedBlock,
  goToNext,
  setActive,
  desktopDescrPaddingRight,
}: NavItemProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isActive || !userReachedBlock) {
      return setProgress(0)
    }

    const timer = setInterval(() => {
      if (progress === 100) {
        setProgress(0)
        goToNext()
      } else {
        setProgress(progress + 0.25)
      }
    }, 25)

    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <Container
      onClick={() => {
        setActive(index)
      }}
      active={isActive}
      desktopDescrPaddingRight={desktopDescrPaddingRight}
    >
      {isActive ? <Progress progress={progress} /> : ""}
      <Arrow reverse={!isActive} />
      <h3>
        {id}. {title}
      </h3>
      {isActive ? <p>{descr}</p> : ""}
    </Container>
  )
}
