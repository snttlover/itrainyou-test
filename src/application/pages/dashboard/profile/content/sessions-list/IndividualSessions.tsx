import styled from "styled-components"
import dayjs from "dayjs"
import { IndividualSessionItem } from "@/application/pages/dashboard/profile/content/sessions-list/IndividualSessionItem"
import { MediaRange } from "@/application/lib/responsive/media"
import { useList } from "effector-react"
import { $categoriesList } from "@/application/pages/landing/content/top-bar/categories-picker/categories-picker.model"
import { $profilePageSessions } from "@/application/pages/dashboard/profile/profile-page.model"

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  background: #fff;
  border-radius: 2px;
  margin-top: 44px;
  padding: 11px 20px;
  margin-bottom: 30px;

  ${MediaRange.lessThan(`mobile`)`
    margin-top: 16px;
  `}
`

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #5b6670;
  text-align: center;
  margin-bottom: 10px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 12px;
    line-height: 16px;
  `}
`

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const IndividualSessions = () => (
  <Container>
    <Title>Индивидуальные сессии</Title>
    <ListContainer>
      {useList($profilePageSessions, session => (
        <IndividualSessionItem data={session} />
      ))}
    </ListContainer>
  </Container>
)
