import { Icon } from "@/components/icon/Icon"
import { Modal } from "@/components/modal/Modal"
import { MediaRange } from "@/lib/responsive/media"
import React, { useRef, useState } from "react"
import ReactIdSwiper, { SwiperInstance, SwiperRefNode } from "react-id-swiper"
import styled from "styled-components"
import Swiper, { SwiperOptions } from "swiper"
import { Loader } from "@/components/spinner/Spinner"

const Layout = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #424242;
  z-index: 999;
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
  ${MediaRange.greaterThan("tablet")`
    font-size: 20px;
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
  flex-direction: column;

  ${MediaRange.greaterThan("mobile")`
    justify-content: space-between;
  `}
`

const CounterText = styled.p`
  position: relative;
  top: 12px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  text-align: center;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`

const Photo = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: calc(100vh - 60px);
`

const PhotoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
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

const SliderWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  &[data-is-first-image="true"] .photo-viewer__prev-button {
    opacity: 0;
  }
`

type ImagesViewModalProps = {
  photos: string[]
  initialSlide: number
  close: () => void
  loadMore?: () => void
  count?: number
}

export const ImagesViewModal = ({ photos, initialSlide, close, loadMore, count }: ImagesViewModalProps) => {
  const swiper = useRef<SwiperRefNode>(null)
  const [currentIndex, setCurrentIndex] = useState(initialSlide)
  const [loading, changeLoading] = useState(false)

  const swiperOptions: SwiperOptions = {
    navigation: {
      nextEl: ".photo-viewer__next-button",
      prevEl: ".photo-viewer__prev-button",
    },
    slidesPerView: 1,
    a11y: false,
    on: {
      slideChange() {
        setCurrentIndex(((this as unknown) as Swiper).activeIndex)
      },
    },
  }

  const setLoading = (fetching: boolean) => {
    if (fetching !== loading) {
      changeLoading(fetching)
    }
  }

  if (!photos[currentIndex] && loadMore) {
    loadMore()
  }
  setLoading(!!(!photos[currentIndex] && loadMore))

  const checkNext = () => {
    if (count && count !== currentIndex + 1 && !photos[currentIndex + 1]) {
      setCurrentIndex(currentIndex + 1)
      setLoading(true)
      loadMore && loadMore()
    }
  }

  return (
    <Modal>
      <Layout>
        <Header>
          Фото
          <Cross onClick={close} />
        </Header>
        <Content>
          {loading && <Loader />}
          {!loading && (
            <>
              <CounterText>
                {currentIndex + 1} из {count || photos.length}
              </CounterText>
              <SliderWrapper data-is-first-image={currentIndex === 0}>
                <ArrowButton
                  className='photo-viewer__prev-button'
                  onClick={() => swiper.current?.swiper?.slidePrev()}
                />
                <ReactIdSwiper {...swiperOptions} initialSlide={initialSlide} ref={swiper}>
                  {photos.map((src, index) => (
                    <PhotoWrapper key={index}>
                      <Photo key={index} src={src} />
                    </PhotoWrapper>
                  ))}
                </ReactIdSwiper>
                <ArrowButton
                  className='photo-viewer__next-button'
                  onClick={() => {
                    checkNext()
                    swiper.current?.swiper?.slideNext()
                  }}
                />
              </SliderWrapper>
            </>
          )}
        </Content>
      </Layout>
    </Modal>
  )
}
