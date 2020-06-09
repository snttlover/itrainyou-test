import { Icon } from "@/application/components/icon/Icon"
import { Modal } from "@/application/components/modal/Modal"
import { MediaRange } from "@/application/lib/responsive/media"
import React, { useState } from "react"
import ReactIdSwiper from "react-id-swiper"
import { SwiperInstance } from "react-id-swiper/lib/types"
import styled from "styled-components"
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
  padding: 0 24px;

  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${MediaRange.greaterThan("mobile")`
    justify-content: flex-start;
  `}
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

const Photo = styled.img``

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
  initialSlide: number
  close: () => void
}

const swiperOptions: SwiperOptions = {
  navigation: {
    nextEl: ".photo-viewer__next-button",
    prevEl: ".photo-viewer__prev-button"
  },
  slidesPerView: 1,
  a11y: false
}

export const ImagesViewModal = ({ photos, initialSlide, close }: ImagesViewModalProps) => {
  const [swiper, updateSwiper] = useState<SwiperInstance | null>(null)
  const [currentIndex, setCurrentIndex] = useState(initialSlide)

  swiper?.on("slideChange", () => {
    setCurrentIndex(swiper?.activeIndex)
  })

  return (
    <Modal>
      <Layout>
        <Header>
          Фото
          <Cross onClick={close} />
        </Header>
        <Content>
          <CounterText>
            {currentIndex + 1} из {photos.length}
          </CounterText>
          <ArrowButton className='photo-viewer__prev-button' onClick={() => swiper?.slidePrev()} />
          <ReactIdSwiper {...swiperOptions} initialSlide={initialSlide} getSwiper={updateSwiper}>
            {photos.map(src => (
              <Photo src={src} />
            ))}
          </ReactIdSwiper>
          <ArrowButton className='photo-viewer__next-button' onClick={() => swiper?.slideNext()} />
        </Content>
      </Layout>
    </Modal>
  )
}
