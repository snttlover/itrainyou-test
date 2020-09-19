import React from "react"
import styled from "styled-components"
import { Dialog } from "@/components/dialog/Dialog"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import { Button } from "@/components/button/normal/Button"
import { MediaRange } from "@/lib/responsive/media"
import { DialogOverlayContainer } from "@/components/dialog/DialogOverlay"

type ImagesLimitDialogProps = {
  visibility: boolean
  onChangeVisibility: () => void
}

export const ImagesLimitDialog = (props: ImagesLimitDialogProps) => (
  <Wrapper>
    <StyledDialog value={props.visibility} onChange={props.onChangeVisibility}>
      <Container>
        <Header>Превышен лимит отправки фотографий</Header>
        <Description>За один раз возможно отправлять только 10 фотографий. Отправить эти фотографии?</Description>
        <Images>
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
          <Image
            style={{ backgroundImage: 'url("https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg")' }}
          />
        </Images>
        <Actions>
          <Cancel>Отмена</Cancel>
          <Confirm>Отправить </Confirm>
        </Actions>
      </Container>
    </StyledDialog>
  </Wrapper>
)

const Wrapper = styled.div`
  ${DialogOverlayContainer} {
    ${MediaRange.lessThan(`mobile`)`
        padding: 0;
        flex-direction: column;
    `}
  }
`

const StyledDialog = styled(Dialog)`
  width: 100%;
  max-width: 560px;

  ${MediaRange.lessThan(`mobile`)`
    min-width: 100%;
    min-height: 100%;
    width: auto;
    overflow: auto;
  `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 432px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`

const Header = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  color: #424242;
  ${MediaRange.lessThan(`mobile`)`
      padding-top: 40px;
  `}
`

const Description = styled.div`
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #5b6670;
  margin-top: 3px;
`

const Images = styled.div`
  margin-top: 20px;
  height: 168px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px 8px;
  width: 100%;
  ${MediaRange.lessThan(`mobile`)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    width: 250px;
    height: 350px;
  `}
`

const Image = styled.div`
  background-size: cover;
`

const Actions = styled.div`
  margin-top: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MediaRange.lessThan(`mobile`)`
      margin-top: 40px;
  `}
`

const Cancel = styled(DashedButton)`
  width: 160px;
  margin-right: 16px;
  ${MediaRange.lessThan(`mobile`)`
      width: 144px;
      margin-right: 8px;
  `}
`

const Confirm = styled(Button)`
  width: 160px;
  ${MediaRange.lessThan(`mobile`)`
      width: 144px;
  `}
`
