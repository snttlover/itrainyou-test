import { RegisterButton } from "@/pages/landing/common/RegisterButton"
import { routeNames } from "@/pages/route-names"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"

import footerBg from "../../assets/footer-bg.svg"
import footerBgTablet from "../../assets/footer-bg-tablet.svg"
import instagram from "../../assets/instagram.svg"
import youtube from "../../assets/youtube.svg"
import facebook from "../../assets/facebook.svg"

const StyledFooter = styled.div`
  background-color: #4858cc;
  background-image: url(${footerBg});
  background-position: 0 0;
  background-size: cover;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    background-image: url(${footerBgTablet});
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

  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
    flex: 1;
  }
`

const StyledLink = styled(Link)`
  margin-left: 64px;
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
  @media screen and (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
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
`

export const Footer = () => (
  <StyledFooter>
    <StyledContainer>
      <Header>
        <Title>
          Вы коуч?<ComeHere>Вам сюда</ComeHere>
        </Title>
        <StyledLink to={routeNames.signup("1")}>
          <RegisterButton>Узнать подробнее</RegisterButton>
        </StyledLink>
      </Header>
      <Description>
        <p>
          Приглашаем коучей к сотрудничеству. Предлагаем растущую базу клиентов, продвижение по 12+ каналам рекламы и
          выгодные условия оплаты. Вы станете известным, будете работать на удобной платформе и привлечете до 200% новых
          учеников.
        </p>
      </Description>
      <MetaContainer>
        <Copyright>Все права защищены I train you</Copyright>
        <Socials>
          <SocialLink href='#'>
            <img src={instagram} />
          </SocialLink>
          <SocialLink href='#'>
            <img src={youtube} />
          </SocialLink>
          <SocialLink href='#'>
            <img src={facebook} />
          </SocialLink>
        </Socials>
      </MetaContainer>
    </StyledContainer>
  </StyledFooter>
)

const MetaContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  height: 52px;
  width: 52px;
`

const Socials = styled.div`
  display: flex;
  & > ${SocialLink}:not(:first-child) {
    margin-left: 16px;
  }
`
