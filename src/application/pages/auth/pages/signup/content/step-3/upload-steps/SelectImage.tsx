import { Button } from "@/application/components/button/normal/Button"
import { MediaRange } from "@/application/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Description = styled.p`
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;

  text-align: center;
  color: #424242;

  margin-top: 24px;

  ${MediaRange.greaterThan("mobile")`
    margin-top: 63px;
    font-size: 16px;
    line-height: 22px;
    width: 100%;
    text-align: center;
  `}
`

const ErrorText = styled.p`
  margin-top: 80px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  text-align: center;

  color: #424242;
`

const Warning = styled.p`
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  text-align: center;
  color: #ff6b00;
  margin-top: 12px;
`

const SelectPhotoButton = styled(Button)`
  margin-top: 56px;
  margin-left: auto;
  margin-right: auto;

  ${MediaRange.greaterThan("mobile")`    
    margin-top: 30px;
  `}
`

const DragText = styled.div`
  width: 100%;
  display: none;
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 60px;

  ${MediaRange.greaterThan("mobile")`    
    display: block;
  `}
`

const BlueText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #4858cc;
`

export const SelectImage = ({ open, error }: { open: () => void; error: "large-file" | "mime-type" | null }) => (
  <>
    {!error && <Description>Вы можете загрузить фотографию в формате PNG, JPG или GIF</Description>}
    {error === "large-file" && <ErrorText>Слишком большой файл</ErrorText>}
    {error === "mime-type" && <ErrorText>Файл не того типа</ErrorText>}

    {!error && <Warning>*Максимальный размер 2 Мбайта</Warning>}
    {error === "large-file" && <Warning>Максимальный размер 2 Мбайта</Warning>}
    {error === "mime-type" && <Warning>Вы можете загрузить фотографию в формате PNG, JPG или GIF</Warning>}
    <SelectPhotoButton onClick={open}>Выберите фотографию</SelectPhotoButton>
    <DragText>
      или <br />
      <BlueText>Перетащите ее на экран</BlueText>
    </DragText>
  </>
)
