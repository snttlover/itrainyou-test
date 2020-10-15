import { CoachDataGate } from "@/pages/coach/profile/edit-page/coach-data/coach-data.model"
import { useGate } from "effector-react"
import { CategoriesList } from "./CategoriesList"
import { CoachAdditionalInformationForm } from "./CoachAdditionalInformationForm"
import { MediaRange } from "@/lib/responsive/media"
import * as React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px 0 0;
  ${MediaRange.greaterThan("mobile")`
    margin: 22px 0 0;
  `}
`

type CoachInformationProps = {
  className?: string
}

export const CoachInformation = ({ className }: CoachInformationProps) => {
  useGate(CoachDataGate)

  return (
    <Container className={className}>
      <CategoriesList />
      <CoachAdditionalInformationForm />
    </Container>
  )
}
