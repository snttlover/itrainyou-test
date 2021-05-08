import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

import mcLogo from "../assets/footer/banks/mc.svg"
import visaLogo from "../assets/footer/banks/visa.svg"
import mirLogo from "../assets/footer/banks/mir.svg"

import fbLogo from "../assets/footer/socials/fb.svg"
import igLogo from "../assets/footer/socials/ig.svg"

const Wrapper = styled.footer`
  background: linear-gradient(101.34deg, #4858cc -7.8%, #7d36a8 114.56%);
`

const StyledContainer = styled(Container)`
  height: 100%;
  padding: 85px 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
`

const BankSection = styled.div``

const BankDescr = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  margin-bottom: 16px;
`

const BankLogos = styled.div`
  display: flex;
  align-items: center;

  img {
    display: block;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`

const SocialsCopySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Socials = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 29px;
`

const Social = styled.a`
  cursor: pointer;
  display: block;

  &:not(:first-child) {
    margin-left: 16px;
  }
`

const CopyRight = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
`

export const Footer = () => (
  <Wrapper>
    <StyledContainer>
      <BankSection>
        <BankDescr>Банк партнер принимает к оплате карты VISA, MasterCard, МИР</BankDescr>
        <BankLogos>
          <img src={mcLogo} />
          <img src={visaLogo} />
          <img src={mirLogo} />
        </BankLogos>
      </BankSection>
      <SocialsCopySection>
        <Socials>
          <Social href='https://facebook.com/' target='_blank'>
            <img src={fbLogo} />
          </Social>
          <Social href='https://instagram.com/' target='_blank'>
            <img src={igLogo} />
          </Social>
        </Socials>
        <CopyRight>© Все права защищены ITrainYou</CopyRight>
      </SocialsCopySection>
    </StyledContainer>
  </Wrapper>
)
