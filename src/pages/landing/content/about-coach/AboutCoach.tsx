import * as React from "react"
import styled from "styled-components"
import whoNeedCoachBg from "../../assets/who-need-coach.svg"
import whoNeedCoachTabletBg from "../../assets/who-need-coach-tablet.svg"

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

  @media screen and (max-width: 768px) {
    height: 353px;
    background-image: url(${whoNeedCoachTabletBg});
    background-position: 36px 0;
    top: 0;
  }
`
