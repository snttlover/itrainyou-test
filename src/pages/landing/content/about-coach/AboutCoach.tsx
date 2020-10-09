import * as React from "react"
import { LandingPageContainer } from "../../common/LandingPageContainer"
import styled from "styled-components"
import whoNeedCoachBg from "../../assets/who-need-coach.svg"

export const AboutCoach = () => <Background />

const Background = styled.div`
  position: relative;
  top: -10px;
  background-image: url(${whoNeedCoachBg});
  background-repeat: no-repeat;
  background-position: 64px 0;
  max-width: 1140px;
  margin: 0 auto;
  height: 527px;
`

const StyledContainer = styled(LandingPageContainer)`
  display: flex;
  justify-content: space-between;
`
