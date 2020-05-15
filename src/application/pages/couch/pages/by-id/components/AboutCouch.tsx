import { MediaRange } from "@/application/lib/responsive/media"
import { Block } from "@/application/pages/coach/pages/by-id/components/common/Block"
import React from "react"
import styled from "styled-components"

const StyledBlock = styled(Block)`
  ${MediaRange.between("mobile", "laptop")`
    padding: 20px 16px;
  `}
`

const Title = styled.h3`
  font-family: Roboto Slab;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #424242;

  &:not(:first-child) {
    margin-top: 12px;
  }
`

const Description = styled.h3`
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #424242;
`

const Photos = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Photo = styled.div<{ src: string }>`
  margin-top: 8px;
  margin-left: 8px;
  width: 100px;
  height: 100px;
  background: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export const AboutCoach = styled(props => {
  const photos = [
    "https://images.pexels.com/photos/556667/pexels-photo-556667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn.pinkvilla.com/files/styles/gallery-section/public/mouni_roys_these_stunning_photos_will_leave_you_spellbound_check_it_out.jpg?itok=Imrsb_ti",
    "https://otvet.imgsmail.ru/download/17d6fbc156adc173770ba2364e258b03_i-1248.jpg",
    "https://vignette.wikia.nocookie.net/anime-characters-fight/images/8/8a/Dio.jpg/revision/latest/scale-to-width-down/340?cb=20181110193813&path-prefix=ru"
  ].map(src => <Photo src={src} />)

  return (
    <StyledBlock {...props}>
      <Title>О себе</Title>
      <Description>
        Психолог с высшим специальным образованием, имеющий дополнительное образование в сфере гештальт-терапии.
        Является разработчиком учебной модели для детей и подростков с отклоняющимся поведёнием и трудностями в
        образовательном процессе. Углублённо занимается вопросами преодоления подросткового кризиса и социальной
        адаптации. Работает над развитием коммуникативной компетентности, занимается коррекцией детско-родительских
        отношений. Владеет основами групповой работы.
      </Description>
      <Title>Опыт работы</Title>
      <Description>5 лет.</Description>
      <Title>Образование</Title>
      <Description>
        Московский социально-педагогический институт, факультет психологии, специализация – психологическое
        консультирование. Окончил педагогический колледж №5, факультет организации воспитательной работы, специализация
        – психология.
      </Description>
      {photos.length > 0 && (
        <>
          <Title>Фотографии</Title>
          <Photos>{photos}</Photos>
        </>
      )}
    </StyledBlock>
  )
})``
