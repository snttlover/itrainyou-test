import * as React from "react"
import styled from "styled-components"
import whoNeedCoachBg from "../../assets/who-need-coach.svg"
import whoNeedCoachTabletBg from "../../assets/who-need-coach-tablet.svg"
import mobile from "../../assets/about-coach-mobile-bg.svg"

export const AboutCoach = () => (
  <>
    <DesktopTabletBackground />
    <MobileList>
      <Ballons />
      <Title>
        Кому
        <br />
        нужен коуч
      </Title>
      <Items>
        <Item>
          <ItemIndex color='#FF4A00'>1</ItemIndex>
          <ItemText>Мир меняется, а я не знаю, за что хвататься, чтобы завтра было лучше</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#0AA7FF'>2</ItemIndex>
          <ItemText>У меня проблемы на работе или ее вообще нет, и я хочу ее найти</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#4858CC'>3</ItemIndex>
          <ItemText>Я хочу быстрых и стоящих результатов</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#4858CC'>4</ItemIndex>
          <ItemText>Я работаю над сложным проектом, а достижения все равно не приносят удовлетворения</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#4858CC'>5</ItemIndex>
          <ItemText>Я не хочу долго разбирать проблемы с психологом, но решение необходимо</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#0AA7FF'>6</ItemIndex>
          <ItemText>У меня много желаний, но я не знаю, как воплотить их в жизнь</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#4858CC'>7</ItemIndex>
          <ItemText>Все дается мне сложно, я очень устаю</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#FF4A00'>8</ItemIndex>
          <ItemText>Я не могу найти свое призвание</ItemText>
        </Item>
        <Item>
          <ItemIndex color='#7C3AA6'>9</ItemIndex>
          <ItemText>Я мечтаю, что мои дети будут успешными и счастливыми</ItemText>
        </Item>
      </Items>
    </MobileList>
  </>
)

const MobileList = styled.div`
  position: relative;
  padding: 0 12px;
`

const Ballons = styled.img.attrs({ src: mobile })`
  position: absolute;
  right: 12px;
  top: 12px;
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 26px;
  color: #4858cc;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

const Item = styled.div`
  display: flex;

  &:not(:first-of-type) {
    margin-top: 12px;
  }
`

const ItemIndex = styled.div<{ color: string }>`
  min-width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 50%;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ItemText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #5b6670;

  margin-left: 8px;
`

const DesktopTabletBackground = styled.div`
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

  @media screen and (max-width: 480px) {
    display: none;
  }
`
