import { RegisterButton } from "@/pages/landing-old/common/RegisterButton"
import { routeNames } from "@/pages/route-names"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing-old/common/LandingPageContainer"

import footerBg from "../../assets/footer-bg.svg"
import footerBgTablet from "../../assets/footer-bg-tablet.svg"
import footerBgMobile from "./images/mobile-background.svg"
import instagram from "../../assets/instagram.svg"
import telegram from "../../assets/telegram.svg"
import facebook from "../../assets/facebook.svg"
import { Icon } from "@/old-components/icon/Icon"
import { MediaRange } from "@/lib/responsive/media"

const StyledFooter = styled.div`
  background-color: #4858cc;
  background-image: url(${footerBg});
  background-position: 0 0;
  background-size: cover;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    background-image: url(${footerBgTablet});
  }
  @media screen and (max-width: 565px) {
    background-image: url(${footerBgMobile});
  }
`

const ComeHere = styled.div`
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;

  margin-top: 12px;

  @media screen and (max-width: 565px) {
    font-size: 16px;
    line-height: 22px;
    margin-top: 8px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 26px;

  color: #fff;

  @media screen and (max-width: 565px) {
    font-size: 24px;
    line-height: 26px;
  }
`

const StyledLink = styled(Link)`
  margin-left: 64px;

  ${RegisterButton} {
    width: 169px;
    padding: 7px 0;
  }
  @media screen and (max-width: 565px) {
    margin-left: 12px;
  }
`

const Description = styled.div`
  width: 603px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;

  color: #fff;

  margin-top: 32px;

  @media screen and (max-width: 768px) {
    width: 370px;
    font-size: 16px;
    line-height: 22px;
  }
  @media screen and (max-width: 565px) {
    display: none;
  }
`

const StyledContainer = styled(LandingPageContainer)`
  padding: 64px 0 38px;
  position: relative;
  height: 700px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    padding: 64px 36px 38px;
    height: 472px;
  }
  @media screen and (max-width: 565px) {
    padding: 16px 12px 12px;
    height: 365px;
    margin: 0;
  }
`

const MirLogo = styled(Icon).attrs({ name: "MIR" })`
  margin-left: 16px;
  width: 32px;
  height: 22px;
`

const VisaLogo = styled(Icon).attrs({ name: "Visa" })`
  margin-left: 16px;
  width: 32px;
  height: 22px;
`

const MasterCardLogo = styled(Icon).attrs({ name: "MasterCard" })`
  width: 32px;
  height: 22px;
`

const LogosContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${MediaRange.lessThan("mobile")`
    
  `}
`

export const Footer = () => (
  <StyledFooter>
    <StyledContainer>
      <Header>
        <Title>
          ???? ?????????<ComeHere>?????? ????????</ComeHere>
        </Title>
        <StyledLink to={routeNames.landingCoach()}>
          <RegisterButton>???????????? ??????????????????</RegisterButton>
        </StyledLink>
      </Header>
      <Description>
        <p>
          ???????????????????? ???????????? ?? ????????????????????????????. ???????????????????? ???????????????? ???????? ????????????????, ?????????????????????? ???? 12+ ?????????????? ?????????????? ??
          ???????????????? ?????????????? ????????????. ???? ?????????????? ??????????????????, ???????????? ???????????????? ???? ?????????????? ?????????????????? ?? ???????????????????? ???? 200% ??????????
          ????????????????.
        </p>
      </Description>
      <MetaContainer>
        <Copyright>?????? ?????????? ???????????????? I train you</Copyright>
        <Socials>
          <SocialLink href='https://www.facebook.com/iTrainYou-107404141044566/'>
            <img src={facebook} />
          </SocialLink>
          <SocialLink href='https://instagram.com/i_trainyou'>
            <img src={instagram} />
          </SocialLink>
          <SocialLink href='https://t.me/i_trainyou'>
            <img src={telegram} />
          </SocialLink>
        </Socials>
        <LogosContainer>
          <MasterCardLogo />
          <VisaLogo />
          <MirLogo />
        </LogosContainer>
      </MetaContainer>
    </StyledContainer>
  </StyledFooter>
)

const MetaContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Copyright = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
`

const SocialLink = styled.a`
  display: block;
  height: 36px;
  width: 36px;

  @media screen and (max-width: 565px) {
    height: 32px;
    width: 32px;

    & > img {
      height: 32px;
      width: 32px;
    }
  }
`

const Socials = styled.div`
  display: flex;
  & > ${SocialLink}:not(:first-child) {
    margin-left: 16px;
  }

  @media screen and (max-width: 565px) {
    position: absolute;
    bottom: 45px;
    right: 12px;

    & > ${SocialLink}:not(:first-child) {
      margin-left: 12px;
    }
  }
`
