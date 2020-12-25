import styled from "styled-components"
import { MediaRange } from "@/lib/responsive/media"
import { useEvent, useStore } from "effector-react"
import * as React from "react"
import { DashedButton } from "@/components/button/dashed/DashedButton"
import peoples from "@/pages/coach/home/approval-failing/images/peoples.svg"
import { $userData } from "@/feature/user/user.model"
import { yandexRegistrationCompletedFx } from "@/pages/coach/home/coach-home.model"

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
    font-family: Roboto Slab;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #75309E;
    margin-bottom: 24px;
`

const StyledButton = styled(DashedButton)`
  width: 200px;
  margin-top: 28px;
    padding: 6px 24px;
  ${MediaRange.lessThan("tablet")`
    margin-top: 24px;
  `}
  ${MediaRange.lessThan("mobile")`
    margin-top: 8px;
  `}
`

const Question = styled.li`
  margin-left: 14px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #5b6670;

  & > div {
    margin-left: 8px;
  }

  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
  `}
`

const InterviewQuestions = styled.ol`
  margin: 8px 0 0;
  border-radius: 2px;
  padding: 16px 8px;
  outline: none;

  ${Question} {
    margin-top: 16px;

    &:first-of-type {
      margin-top: 0;
    }
  }
    
  ${MediaRange.greaterThan("mobile")`
    font-size: 16px;
    line-height: 22px;
    padding: 32px 32px 24px 32px;
    
    ${Question} {
      margin-top: 28px;
    }
  `}
`

const InterviewTitle = styled.div`
    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
    color: #424242;
    text-align: center;
    margin-bottom: 24px;
`

const Peoples = styled.img.attrs({ src: peoples })`
  width: 109.08px;
  height: 144.37px;
  margin-bottom: 40px;
`

const SubTitle = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #5B6670;
`

const InstructionText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #424242;

  max-width: 460px;
  margin: 20px auto;

  & a {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #783D9D;
  }
`

export const YandexKassaInstructions = () => {
  const legalForm = useStore($userData)
  const _sendYandexRegistration = useEvent(yandexRegistrationCompletedFx)
  return (
    <Container>
      <Title>Вашу анкету одобрили!</Title>
      <Peoples />

      {legalForm.coach?.legalForm === "IP_OTHER_TAXES" ?
        <InterviewQuestions>
          <InterviewTitle>Зарегистрируйтесь в ЮKassa</InterviewTitle>
          <Question>
            <div>
                          На e-mail, который Вы использовали при регистрации на https://itrainyou.ru/, Вам будет направлено приглашение присоединиться к ЮКассе, пройдите
                          по ссылке в этом приглашении (кнопка “Подключить Кассу”)
                          и зарегистрируйтесь в ЮКассе
            </div>
          </Question>
          <Question>
            <div>Заполните данные для договора с Кассой и отправьте их на проверку, согласно дальнейшей инструкции от ЮКасса</div>
          </Question>
          <Question>
            <div>После проверки подпишите договор с ЮКасса</div>
          </Question>
          <Question>
            <div>
                После завершения регистрации Вы получите e-mail от ЮKassa.
                Нажмите кнопку “Зарегистрировался в Кассе” ниже
            </div>
          </Question>
        </InterviewQuestions>

        :
        <>
          <InterviewTitle>Зарегистрируйтесь в ЮKassa</InterviewTitle>
          <SubTitle>Для этого следуйте инструкции во вложении.</SubTitle>
          <InstructionText>
            <a href='/instructions_ykassa.pdf' target='_blank'>Инструкция</a>
          </InstructionText>
        </>
      }
      <StyledButton onClick={() => _sendYandexRegistration()}>Я зарегистрировался</StyledButton>
    </Container>
  )
}