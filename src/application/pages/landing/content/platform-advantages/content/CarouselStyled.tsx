import styled from "styled-components"

export const StyledCarousel = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: none;

  @media screen and (max-width: 638px) {
    display: block;
  }

  .react-multi-carousel-list {
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  .react-multi-carousel-track {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    position: relative;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform, transition;
  }
  .react-multiple-carousel__arrow {
    display: none;
    position: absolute;
    outline: 0;
    transition: all 0.5s;
    border-radius: 35px;
    z-index: 1000;
    border: 0;
    background: rgba(0, 0, 0, 0.5);
    min-width: 43px;
    min-height: 43px;
    opacity: 1;
    cursor: pointer;
  }
  .react-multiple-carousel__arrow:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  .react-multiple-carousel__arrow::before {
    font-size: 20px;
    color: #fff;
    display: block;
    font-family: revicons;
    text-align: center;
    z-index: 2;
    position: relative;
  }
  .react-multiple-carousel__arrow--left {
    left: calc(4% + 1px);
  }
  .react-multiple-carousel__arrow--left::before {
    content: "\\e824";
  }
  .react-multiple-carousel__arrow--right {
    right: calc(4% + 1px);
  }
  .react-multiple-carousel__arrow--right::before {
    content: "\\e825";
  }
  .react-multi-carousel-dot-list {
    position: absolute;
    bottom: 0;
    display: flex;
    left: 0;
    right: 0;
    justify-content: center;
    margin: auto;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .react-multi-carousel-dot button {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    opacity: 1;
    padding: 5px 5px 5px 5px;
    box-shadow: none;
    transition: background 0.5s;
    border-width: 2px;
    border-style: solid;
    border-color: grey;
    padding: 0;
    margin: 0;
    margin-right: 6px;
    outline: 0;
    cursor: pointer;
  }
  .react-multi-carousel-dot button:hover:active {
    background: #080808;
  }
  .react-multi-carousel-dot--active button {
    background: #080808;
  }
  .react-multi-carousel-item {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .react-multi-carousel-item {
      flex-shrink: 0 !important;
    }
    .react-multi-carousel-track {
      overflow: visible !important;
    }
  }
`
