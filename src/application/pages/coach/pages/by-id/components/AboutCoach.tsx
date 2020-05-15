import { MediaRange } from "@/application/lib/responsive/media"
import { $coach } from "@/application/pages/coach/pages/by-id/coach-by-id.model"
import { Block } from "@/application/pages/coach/pages/by-id/components/common/Block"
import { useStore } from "effector-react"
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
  const coach = useStore($coach)
  const photos = coach?.photos.map(src => <Photo src={src} />) || []

  return (
    <StyledBlock {...props}>
      {coach?.description && (
        <>
          <Title>О себе</Title>
          <Description>{coach?.description}</Description>
        </>
      )}
      {coach?.workExpirience && (
        <>
          <Title>Опыт работы</Title>
          <Description>{coach?.workExpirience}</Description>
        </>
      )}
      {coach?.education && (
        <>
          <Title>Образование</Title>
          <Description>{coach?.education}</Description>
        </>
      )}
      {photos.length > 0 && (
        <>
          <Title>Фотографии</Title>
          <Photos>{photos}</Photos>
        </>
      )}
    </StyledBlock>
  )
})``
