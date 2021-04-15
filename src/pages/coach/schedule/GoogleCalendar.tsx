import * as React from "react"
import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { Description, Title } from "@/pages/coach/schedule/Schedule"
import { Icon } from "@/oldcomponents/icon/Icon"

const GoogleButton = styled.div`
    border: 2px solid #F4F5F7;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 295px;
    margin-top: 24px;
    cursor: pointer;
    padding: 8px 16px;

    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 1px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.12);
    }
`

const GoogleIcon = styled(Icon).attrs({name: "google-calendar"})`
    width: 40px;
    height: 40px;
    margin-right: 20px;
`

export const GoogleCalendar = () => {
  return (
    <>
      <Title>Google-календарь</Title>
      <Description>Синхронизируйтесь со своим google-календарём, и мы отметим недоступными даты, когда вы заняты</Description>
      <GoogleButton>
        <GoogleIcon />
        <div>Подключить Google-календарь</div>
      </GoogleButton>
    </>
  )
}

