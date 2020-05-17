import { Button } from "@/application/components/button/normal/Button"
import { MediaRange } from "@/application/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Description = styled.p<{ largeFileError: boolean }>`
  font-family: Roboto;
  font-weight: ${({ largeFileError }) => (largeFileError ? "600" : "normal")};
  font-size: ${({ largeFileError }) => (largeFileError ? "16px" : "14px")};
  line-height: ${({ largeFileError }) => (largeFileError ? "22px" : "18px")};

  text-align: center;
  color: #424242;

  margin-top: ${({ largeFileError }) => (largeFileError ? "100px" : "24px")};

  ${MediaRange.greaterThan("mobile")`
    margin-top: 63px;
    font-size: 16px;
    line-height: 22px;
    width: 100%;
    text-align: center;
  `}
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

export const SelectImage = ({ open, largeFileError }: { open: () => void; largeFileError: boolean }) => (
  <>
    <Description largeFileError={largeFileError}>
      {largeFileError ? "Слишком большой файл" : "Вы можете загрузить фотографию в формате PNG, JPG или GIF"}
    </Description>
    <Warning>*Максимальный размер 2 Мбайта</Warning>
    <SelectPhotoButton onClick={open}>Выберите фотографию</SelectPhotoButton>
    <DragText>
      или <br />
      <BlueText>Перетащите ее на экран</BlueText>
    </DragText>
  </>
)
