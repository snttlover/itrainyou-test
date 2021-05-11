import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { content } from "./content"

import { Container } from "../../common/Container"

import arrowIcon from "../../assets/features/desktop/arrow-down.svg"

const StyledContainer = styled(Container)`
  height: 100%;
  min-height: 620px;
  padding: 40px 0 44px;
  overflow: hidden;
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

const NavItem = styled.div`
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
  }
`

const Progress = styled.div`
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

const Arrow = styled.i`
  display: block;
  position: absolute;
  top: 8px;
  right: 5px;
  width: 14px;
  height: 8px;
  background: url("${arrowIcon}");
  transform: rotate(${props => (props.reverse ? "0deg" : "180deg")});
`

const CurrentImage = styled.img`
  position: absolute;
  top: ${props => (props.topOffset ? props.topOffset : "40")}px;
  right: 0;
  max-width: 600px;
`

export const Desktop = ({ className }) => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [userReachedBlock, setUserReachedBlock] = useState(false)

  const isBottom = (el: any) => {
    return el.getBoundingClientRect().top <= window.innerHeight
  }

  const handleScroll = () => {
    const wrappedElement = document.getElementById("features-desktop-block")

    if (isBottom(wrappedElement)) {
      if (userReachedBlock) return

      setActiveFeature(0)
      setProgress(0)
      setUserReachedBlock(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    const timer = setInterval(() => {
      if (progress === 100) {
        setProgress(0)
        setActiveFeature(activeFeature === content.length - 1 ? 0 : activeFeature + 1)
      } else {
        setProgress(progress + 0.25)
      }
    }, 25)

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timer)
    }
  })

  return (
    <StyledContainer className={className} id='features-desktop-block'>
      <Title>Используйте все функции личного кабинета</Title>
      <Nav>
        {content.map((item, index) => (
          <NavItem
            key={item.id}
            onClick={() => {
              setActiveFeature(index)
              setProgress(0)
            }}
            active={activeFeature === index}
          >
            {activeFeature === index ? <Progress progress={progress} /> : ""}
            <Arrow reverse={activeFeature !== index} />
            <h3>
              {item.id}. {item.title}
            </h3>
            {activeFeature === index ? <p>{item.descr}</p> : ""}
          </NavItem>
        ))}
      </Nav>
      <CurrentImage topOffset={content[activeFeature].desktopTopOffset} src={content[activeFeature].image} />
    </StyledContainer>
  )
}
