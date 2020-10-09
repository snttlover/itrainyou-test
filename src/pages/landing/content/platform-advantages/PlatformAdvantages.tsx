import * as React from "react"
import styled from "styled-components"
import { LandingPageContainer } from "@/pages/landing/common/LandingPageContainer"

import phone1 from "./images/phone1.png"
import phone2 from "./images/phone2.png"
import bg from "./images/bg.svg"

const StyledContainer = styled(LandingPageContainer)`
  position: relative;
  height: 500px;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: 129px 84px;

  @media screen and (max-width: 1000px) {
    margin-bottom: 121px;
  }
  @media screen and (max-width: 638px) {
    margin-bottom: 53px;
  }
`

const AdvantageFirst = styled.div`
  position: absolute;
  top: 109px;
  left: 86px;

  width: 182px;
  height: 122px;
`

const AdvantageSecond = styled.div`
  position: absolute;
  top: 19px;
  left: 582px;

  width: 187px;
  height: 122px;
`

const AdvantageThird = styled.div`
  position: absolute;

  top: 225px;
  left: 802px;
  width: 256px;
  height: 148px;
`

const AdvantageTitle = styled.h4`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  color: #4858cc;
`

const AdvantageText = styled.p`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
`

const Phone1 = styled.div`
  position: absolute;
  width: 240px;
  height: 483px;

  left: 300px;

  background-image: url(${phone1});
`

const Phone2 = styled.div`
  position: absolute;
  top: 150px;
  left: 550px;
  width: 240px;
  height: 483px;

  background-image: url(${phone2});
`

export const PlatformAdvantages = () => (
  <StyledContainer>
    <Phone1 />
    <Phone2 />
    <AdvantageFirst>
      <AdvantageTitle>Личный кабинет</AdvantageTitle>
      <AdvantageText>Переписывайтесь, планируйте календарь, получайте материалы от коучей в одном окне.</AdvantageText>
    </AdvantageFirst>
    <AdvantageSecond>
      <AdvantageTitle>Удобный поиск</AdvantageTitle>
      <AdvantageText>Выбирайте коучей по направлению, цене и времени за несколько кликов.</AdvantageText>
    </AdvantageSecond>
    <AdvantageThird>
      <AdvantageTitle>Под контролем администрации</AdvantageTitle>
      <AdvantageText>
        Спорные ситуации разбирает куратор, при некорректном поведении коуча клиент получает деньги назад.
      </AdvantageText>
    </AdvantageThird>
  </StyledContainer>
)
