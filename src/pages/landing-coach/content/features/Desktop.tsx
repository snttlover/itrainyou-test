import React from "react"
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
    /* transition: all 0.1s ease; */
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

type Props = any

type State = {
  activeFeature: number
  progress: number
}

export class Desktop extends React.Component<Props, State> {
  private timer: any

  state: State = {
    activeFeature: 0,
    progress: 0,
  }

  componentDidMount() {
    this.timer = setInterval(
      () =>
        this.setState(prevState => {
          if (prevState.progress === 100) {
            return {
              progress: 0,
              activeFeature: prevState.activeFeature === content.length - 1 ? 0 : prevState.activeFeature + 1,
            }
          }

          return {
            progress: prevState.progress + 1,
          }
        }),
      100
    )
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <StyledContainer className={this.props.className}>
        <Title>Используйте все функции личного кабинета</Title>
        <Nav>
          {content.map((item, index) => (
            <NavItem
              key={item.id}
              onClick={() => {
                this.setState({ activeFeature: index, progress: 0 })
              }}
              active={this.state.activeFeature === index}
            >
              {this.state.activeFeature === index ? <Progress progress={this.state.progress} /> : ""}
              <Arrow reverse={this.state.activeFeature !== index} />
              <h3>
                {item.id}. {item.title}
              </h3>
              {this.state.activeFeature === index ? <p>{item.descr}</p> : ""}
            </NavItem>
          ))}
        </Nav>
        <CurrentImage
          topOffset={content[this.state.activeFeature].desktopTopOffset}
          src={content[this.state.activeFeature].image}
        />
      </StyledContainer>
    )
  }
}
