import * as React from "react"
import styled from "styled-components"

const CheckStepContainer = styled.div`
  position: relative;

  width: 164px;
  height: auto;



  box-sizing: border-box;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
    
  font-family: Roboto;  
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #424242;

  padding: 8px 12px 12px;
`

const Icon = styled.img`
  margin-top: 8px;
`

export const CheckStep = styled(
  ({ description, img, className }: { description: string; img?: string; className?: string }) => (
    <CheckStepContainer className={className}>
      <span dangerouslySetInnerHTML={{ __html: description }} />
      <Icon src={img} />
    </CheckStepContainer>
  )
)``
