import React from "react"
import styled from "styled-components"

import { Container } from "../../common/Container"

const Wrapper = styled.section`
  background: white;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin-bottom: 88px;
  }

  @media (min-width: 1024px) {
    margin-bottom: 80px;
  }

  @media (min-width: 1140px) {
    margin-bottom: 120px;
  }
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4858cc;
`

const AdvantagesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 288px;

  @media (min-width: 768px) {
    width: 596px;
  }

  @media (min-width: 1140px) {
    width: 100%;
  }
`

const Advantage = styled.li<{ visibleDesktopSubtitle: boolean }>`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }

  @media (min-width: 768px) and (max-width: 1139px) {
    width: 286px;

    &:nth-child(-n + 2) {
      margin-bottom: 32px;
    }

    &:nth-child(2n + 1) {
      margin-right: 24px;
    }
  }

  @media (min-width: 768px) and (max-width: 1139px) {
    width: 286px;

    &:nth-child(-n + 2) {
      margin-bottom: 32px;
    }

    &:nth-child(2n + 1) {
      margin-right: 24px;
    }
  }

  @media (min-width: 1140px) {
    width: 255px;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }

  img {
    display: block;
    margin-bottom: 8px;
    height: 60px;
  }

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #4858cc;
    margin-bottom: 8px;
    min-height: 40px;
    width: 100%;

    @media (min-width: 768px) {
      width: 80%;
    }
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #5b6670;
    width: 100%;

    @media (min-width: 768px) {
      width: 100%;
    }

    @media (min-width: 1140px) {
      width: 80%;
    }
  }

  /* Mobile / Desktop different subtitles */

  .desktopSubtitle {
    display: none;
  }

  .mobileSubtitle {
    display: block;
  }

  @media (min-width: 1140px) {
    .desktopSubtitle {
      display: block;
    }

    .mobileSubtitle {
      display: none;
    }
  }
`

type Props = {
  advantages: any[]
}

export const Advantages = ({ advantages }: Props) => (
  <Wrapper>
    <StyledContainer>
      <AdvantagesList>
        {advantages.map(item => (
          <Advantage key={item.id} visibleDesktopSubtitle={!item.subtitleMobile}>
            <img src={item.image} />
            <h3>{item.title}</h3>
            <p className='desktopSubtitle'>{item.subtitle}</p>
            <p className='mobileSubtitle' dangerouslySetInnerHTML={{ __html: item.subtitleMobile }} />
          </Advantage>
        ))}
      </AdvantagesList>
    </StyledContainer>
  </Wrapper>
)
