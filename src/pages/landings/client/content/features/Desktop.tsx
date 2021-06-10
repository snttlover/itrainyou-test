import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { content } from "./content"

import { Container } from "../../../common/Container"
import { NavItem } from "./desktop/NavItem"

const StyledContainer = styled(Container)`
  height: 100%;
  min-height: 640px;
  padding: 60px 0;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
`

const Title = styled.h2`
  width: 441px;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #ffffff;
  margin-bottom: 32px;
`

const Nav = styled.nav`
  width: 380px;
`

const CurrentImage = styled.img<{ topOffset: number; rightOffset: number; width: number }>`
  position: absolute;
  top: ${props => (props.topOffset ? props.topOffset : "40")}px;
  right: ${props => (props.topOffset ? props.rightOffset : "0")}px;
  max-width: ${props => (props.width ? props.width : "650")}px;
`

type Props = {
  className?: any
}

export const Desktop = ({ className }: Props) => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [userReachedBlock, setUserReachedBlock] = useState(false)

  const isBottom = (el: any) => {
    return el.getBoundingClientRect().top <= window.innerHeight
  }

  const handleScroll = () => {
    const wrappedElement = document.getElementById("features-desktop-block")

    if (isBottom(wrappedElement)) {
      if (userReachedBlock) return

      setUserReachedBlock(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const goToNext = () => {
    if (activeFeature === content.length - 1) {
      setActiveFeature(0)
    } else {
      setActiveFeature(activeFeature + 1)
    }
  }

  return (
    <StyledContainer className={className} id='features-desktop-block'>
      <Title>Используйте все функции личного кабинета</Title>
      <Nav>
        {content.map((item, index) => (
          <NavItem
            key={item.id}
            index={index}
            id={item.id}
            title={item.title}
            descr={item.descr}
            isActive={activeFeature === index}
            userReachedBlock={userReachedBlock}
            goToNext={goToNext}
            setActive={setActiveFeature}
          />
        ))}
      </Nav>
      <CurrentImage
        topOffset={content[activeFeature].desktopTopOffset}
        rightOffset={content[activeFeature].desktopRightOffset || 0}
        width={content[activeFeature].desktopWidth}
        src={content[activeFeature].image}
      />
    </StyledContainer>
  )
}
