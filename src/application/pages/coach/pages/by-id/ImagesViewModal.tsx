import { Icon } from "@/application/components/icon/Icon"
import { Modal } from "@/application/components/modal/Modal"
import { MediaRange } from "@/application/lib/responsive/media"
import React, { useCallback } from "react"
import ReactIdSwiper from "react-id-swiper"
import styled from "styled-components"
import media from "styled-media-query"
import { SwiperOptions } from "swiper"

const Layout = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #424242;
  z-index: 10;
`

const Header = styled.div`
  background: #ffffff;
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Cross = styled(Icon).attrs({ name: "cross" })`
  fill: #4858cc;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`

const Content = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  ${MediaRange.greaterThan("mobile")`
    justify-content: space-between;
  `}
`

const CounterText = styled.p`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translate(-50%, 0);

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`

const Photo = styled.img`
  max-width: 95%;
  max-height: 95%;

  ${MediaRange.greaterThan("mobile")`
    max-width: 80%;
  `}
`

const ArrowButton = styled(Icon).attrs({ name: "arrow" })`
  min-width: 40px;
  min-height: 40px;
  width: 40px;
  height: 40px;
  display: none;
  fill: #ffffff;
  cursor: pointer;

  &.photo-viewer__prev-button {
    transform: rotate(90deg);
    margin-right: 10px;
  }

  &.photo-viewer__next-button {
    transform: rotate(-90deg);
    margin-left: 10px;
  }

  ${MediaRange.greaterThan("mobile")`
    display: block;
  `}
`

type ImagesViewModalProps = {
  photos: string[]
  currentIndex: number
  onCurrentChange: (i: number | null) => void
}

const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: ".photo-viewer__next-button",
    prevEl: ".photo-viewer__prev-button"
  },
  slidesPerView: 1,
  a11y: false
}

export const ImagesViewModal = ({ photos, currentIndex, onCurrentChange }: ImagesViewModalProps) => {
  const onChange = (add: number) => {
    let nextIndex = currentIndex + add
    if (nextIndex < 0) nextIndex = photos.length - 1
    else if (nextIndex > photos.length - 1) nextIndex = 0
    onCurrentChange(nextIndex)
  }
  return (
    <Modal>
      <Layout>
        <Header>
          Фото
          <Cross onClick={() => onCurrentChange(null)} />
        </Header>
        <Content>
          <CounterText>
            {currentIndex + 1} из {photos.length}
          </CounterText>
          <ArrowButton className='photo-viewer__prev-button' onClick={() => onChange(-1)} />
          <Photo src={photos[currentIndex]} />
          <ArrowButton className='photo-viewer__next-button' onClick={() => onChange(1)} />
        </Content>
      </Layout>
    </Modal>
  )
}
