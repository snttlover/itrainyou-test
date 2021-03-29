import { RegisterButton } from "@/pages/landing/common/RegisterButton"
import { routeNames } from "@/pages/route-names"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import facebook from "@/pages/landing/assets/facebook.svg"
import instagram from "@/pages/landing/assets/instagram.svg"
import telegram from "@/pages/landing/assets/telegram.svg"

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 40px;
  color: #fff;

  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 26px;
  }
  @media screen and (max-width: 480px) {
    font-size: 20px;
    line-height: 26px;
  }
`
const Description = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;

  margin-top: 16px;

  @media screen and (max-width: 768px) {
    width: 346px;
    margin-top: 12px;

    font-size: 16px;
    line-height: 22px;
  }

  @media screen and (max-width: 480px) {
    width: unset;
    font-size: 14px;
    line-height: 18px;
  }
`

const StyledLandingPageContainer = styled(LandingPageContainer)`
  display: flex;
  flex-direction: column;

  margin-top: 51px;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 0 36px;
  }
  @media screen and (max-width: 480px) {
    padding: 0;
    margin-top: 0;
    font-size: 20px;
    line-height: 26px;
  }
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
    align-self: flex-end;
    margin-left: 20px;
    & > ${SocialLink}:not(:first-child) {
        margin-left: 16px;
    }

    @media screen and (max-width: 480px) {
        align-self: flex-start;
        margin-top: 12px;
        margin-left: 0;
    }
`

const StyledRegLink = styled(Link)`
  width: fit-content;
  margin-top: 28px;

  @media screen and (max-width: 768px) {
    margin-top: 12px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;


    @media screen and (max-width: 480px) {
        flex-direction: column;
    }  
`

export const Hero = () => (
  <StyledLandingPageContainer>
    <Title>
      Онлайн пространство для
      <br />
      подбора и работы с<br />
      проверенными коучами
    </Title>
    <Description>Выберите специалиста, чтобы решить любую жизненную проблему</Description>
    <ButtonContainer>
      <StyledRegLink to={routeNames.signup("1")}>
        <RegisterButton>Зарегистрироваться</RegisterButton>
      </StyledRegLink>
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
    </ButtonContainer>
  </StyledLandingPageContainer>
)
