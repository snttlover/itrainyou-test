import * as React from "react"
import styled from "styled-components"
import difImg from "./Group.svg"
import topImg from "./goToTopImg.svg"
import waveImg from "./wave.svg"
import { ContentContainer } from "@/components/layouts/ContentContainer"
import { MediaRange } from "@/lib/responsive/media"


export function Onboarding (){
  return (
    <Container>
      <ContentContainer>
        <StartContainer>
          <TitlesContainer>
            <TextTitle>Начните менить свою жизнь!</TextTitle>
            <SearchCoachSubtitle>Найдите себе коуча, который поможет <br/> вам справиться с трудностями</SearchCoachSubtitle>
            <SearchButton>Найти коуча</SearchButton>
          </TitlesContainer>
          <DifficultiesImg src={difImg}/>
        </StartContainer>
      </ContentContainer>

      <TopBlockContainer>
        <ToTopImg src={topImg}/>
        <TitlesContainer>
          <TextTitle>Скоро все начнется!</TextTitle>
          <OnThisPageSubtitle>
            На этой странице будут:
          </OnThisPageSubtitle>
          <PageFeatureList>
            <FeatureItem>Сессии, которые уже начались</FeatureItem>
            <FeatureItem>Анонс ваших сегодняшних сессий</FeatureItem>
          </PageFeatureList>
        </TitlesContainer>
      </TopBlockContainer>

    </Container>
  )
}

const PageFeatureList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  ${MediaRange.lessThan("mobile")`
    margin-bottom: 32px;
  `}
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  &:before{
    content: '';
    margin-right: 12px;
    display: block;
    width: 11px;
    height: 11px;
    background-color: #4858CC;
    border-radius: 50%;
  }
`

const SearchButton = styled.button`
  border: none;
  outline: none;
  border-radius: 34px;
  background-color: #4858CC;
  padding: 6px 64px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  ${MediaRange.lessThan("mobile")`
    padding: 6px 20px;
    font-size: 14px;
  `} 
`

const DifficultiesImg = styled.img`
  width: 289px;
  ${MediaRange.lessThan("tablet")`
    
  `}
  ${MediaRange.lessThan("mobile")`
    margin-top: 32px;
  `}
`
const ToTopImg = styled.img`
  width: 327px;
  margin-right: 53px;

  ${MediaRange.lessThan("tablet")`
    width: 272px;
  `}
  ${MediaRange.lessThan("mobile")`
    width: 222px;
  `}
`

const TextTitle = styled.div`
  font-family: "Roboto Slab";
  font-size: 24px;
  margin-bottom: 16px;
`

const TextSubtitle = styled.div`
  font-family: "Roboto";
  font-size: 16px;
  width: 363px;
  line-height: 24px;
  ${MediaRange.lessThan("mobile")`
    width: auto;
  `}
`

const SearchCoachSubtitle = styled(TextSubtitle)`
  margin-bottom: 36px;

`

const OnThisPageSubtitle = styled(TextSubtitle)`
  margin-bottom: 12px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
`

const StartContainer = styled.div`
  display: flex;
  margin-bottom: 51px;
  ${MediaRange.lessThan("tablet")`
  `}
  ${MediaRange.lessThan("mobile")`
    flex-direction: column;
    margin-bottom: 60px;
  `}
`

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 51px;
  align-items: flex-start;
  ${MediaRange.lessThan("tablet")`
    padding-right: 0;
  `}
  ${MediaRange.lessThan("mobile")`
    padding-right: 0;
  `}
`

const TopBlockContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 446px;
  background-repeat: repeat-x;
  background-image: url(${waveImg});
  background-size: contain;
  background-position: center;
  ${MediaRange.lessThan("mobile")`
    flex-direction: column-reverse;
    background-position: bottom;
    justify-content: space-between;
    height: auto;
    margin-bottom: 60px;
  `}
`