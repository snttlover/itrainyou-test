import React from "react"
import styled from "styled-components"

import { content } from "./content"

import { Container } from "../../common/Container"

const StyledContainer = styled(Container)`
  height: 100%;
  min-height: 480px;
  padding: 44px 0 194px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
`

const Title = styled.h2`
  width: 302px;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  color: #ffffff;
  margin-bottom: 44px;
`

const Nav = styled.nav`
  width: 302px;
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
    color: ${props => (props.active ? "rgba(225, 255, 255, 1)" : "rgba(225, 230, 234, 0.6)")};
    transition: all 0.2s ease;
  }

  &:hover {
    h3 {
      color: rgba(225, 255, 255, 1);
    }
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

const CurrentImage = styled.img`
  position: absolute;
  top: ${props => (props.topOffset ? props.topOffset : "37")}px;
  right: 127px;
  max-width: 600px;
`

type Props = any

type State = {
  activePubl: number
  progress: number
  userReachedBlock: boolean
}

export class Desktop extends React.Component<Props, State> {
  private timer: any

  state: State = {
    activePubl: 0,
    progress: 0,
    userReachedBlock: false,
  }

  isBottom(el: any) {
    return el.getBoundingClientRect().top <= window.innerHeight
  }

  handleScroll() {
    const wrappedElement = document.getElementById("publications-desktop-block")

    if (this.isBottom(wrappedElement)) {
      if (this.state.userReachedBlock) return

      this.setState({ userReachedBlock: true, activePubl: 0, progress: 0 })
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this))

    this.timer = setInterval(
      () =>
        this.setState(prevState => {
          if (prevState.progress === 100) {
            return {
              progress: 0,
              activePubl: prevState.activePubl === content.length - 1 ? 0 : prevState.activePubl + 1,
            }
          }

          return {
            progress: prevState.progress + 0.25,
          }
        }),
      10
    )
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    clearInterval(this.timer)
  }

  render() {
    return (
      <StyledContainer className={this.props.className} id='publications-desktop-block'>
        <Title>Публикации о нас</Title>
        <Nav>
          {content.map((item, index) => (
            <NavItem
              key={item.id}
              onClick={() => {
                this.setState({ activePubl: index, progress: 0 })
              }}
              active={this.state.activePubl === index}
            >
              {this.state.activePubl === index ? <Progress progress={this.state.progress} /> : ""}
              <h3>{item.title}</h3>
            </NavItem>
          ))}
        </Nav>
        <CurrentImage
          topOffset={content[this.state.activePubl].desktopTopOffset}
          src={content[this.state.activePubl].image}
        />
      </StyledContainer>
    )
  }
}
