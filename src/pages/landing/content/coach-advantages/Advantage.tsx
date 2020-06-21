import styled from "styled-components"
import mobileListItemPin from "./images/mobile-list-item-pin.svg"

export const Advantage = styled.div`
  background: #daebf7;
  border-radius: 54px;
  padding: 15px 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #544274;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
    padding: 4px 12px;
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 580px) {
    position: relative;
    background: #fff;
    width: 100% !important;
    margin: 0 0 24px 0 !important;
    font-size: 12px;
    line-height: 16px;
    min-height: unset;
    font-weight: 600;
    color: #424242;
    padding: 0 0 0 22px;

    &:after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      background-image: url("${mobileListItemPin}");
      width: 12px;
      height: 12px;
    }
  }
`
