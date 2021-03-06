import React from "react"
import styled from "styled-components"

import { Container } from "../Container"

import mcLogo from "./assets/banks/mc.svg"
import visaLogo from "./assets/banks/visa.svg"
import mirLogo from "./assets/banks/mir.svg"

import tgLogo from "./assets/socials/tg.svg"
import fbLogo from "./assets/socials/fb.svg"
import igLogo from "./assets/socials/ig.svg"
import { ymLog } from "@/lib/external-services/yandex-metrika/lib"

const Wrapper = styled.footer`
  background: linear-gradient(101.34deg, #4858cc -7.8%, #7d36a8 114.56%);
`

const StyledContainer = styled(Container)`
  position: relative;
  padding: 88px 0 16px;
  color: white;

  @media (min-width: 558px) {
    padding: 88px 0 38px;
  }

  @media (min-width: 768px) {
    padding: 85px 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`

const BankSection = styled.div`
  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const BankDescr = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #ffffff;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    margin-bottom: 16px;
  }
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
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

const Socials = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 32px;
  left: 0;

  @media (min-width: 768px) {
    position: static;
    margin-bottom: 29px;
  }
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
        <BankDescr>???????? ?????????????? ?????????????????? ?? ???????????? ?????????? VISA, MasterCard, ??????</BankDescr>
        <BankLogos>
          <img src={mcLogo} />
          <img src={visaLogo} />
          <img src={mirLogo} />
        </BankLogos>
      </BankSection>
      <SocialsCopySection>
        <Socials>
          <Social href='https://t.me/i_trainyou' target='_blank' onClick={() => ymLog("reachGoal", "tgland")}>
            <img src={tgLogo} />
          </Social>
          <Social
            href='https://www.facebook.com/ITrainYou-107404141044566/'
            target='_blank'
            onClick={() => ymLog("reachGoal", "fbland")}
          >
            <img src={fbLogo} />
          </Social>
          <Social
            href='https://www.instagram.com/i.trainyou/?hl=ru'
            target='_blank'
            onClick={() => ymLog("reachGoal", "instland")}
          >
            <img src={igLogo} />
          </Social>
        </Socials>
        <CopyRight>?? ?????? ?????????? ???????????????? iTrainYou</CopyRight>
      </SocialsCopySection>
    </StyledContainer>
  </Wrapper>
)
