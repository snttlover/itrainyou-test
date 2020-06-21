import styled from "styled-components"

const Container = styled.div`
  background: #dbdee0;
  border-radius: 0px 0px 2px 2px;
  padding: 12px;
`

const StyledInput = styled.input``

type ChatMessageBoxTypes = {
  value: string
  onChange: (value: string) => void
}

export const ChatMessageBox = (props: ChatMessageBoxTypes) => (
  <Container>
    <StyledInput
      value={props.value}
      placeholder='Напишите сообщение...'
      onChange={e => props.onChange(e.target.value)}
    />
  </Container>
)
