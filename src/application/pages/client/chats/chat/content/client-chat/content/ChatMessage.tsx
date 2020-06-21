import styled from "styled-components"

type ContainerTypes = {
  "data-self": boolean
}

const Container = styled.div<ContainerTypes>`
  padding: 5px 8px;

  background: #eceff1;
  border-radius: 12px 12px 12px 0px;
  width: 100%;
  min-width: 472px;
  color: #424242;
  margin-bottom: 8px;

  font-size: 16px;
  line-height: 22px;
  &[data-self=true] {
    background: #4858cc;
    border-radius: 12px 12px 0px 12px;
    color: #ffffff;
  }
`

const Time = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: rgba(66, 66, 66, 0.5);
`

type ChatMessageTypes = {
  children: React.ReactChild
  time: string
} & ContainerTypes

export const ChatMessage = (props: ChatMessageTypes) => (
  <Container data-self={props["data-self"]}>
    {props.children}
    <Time>{props.time}</Time>
  </Container>
)
