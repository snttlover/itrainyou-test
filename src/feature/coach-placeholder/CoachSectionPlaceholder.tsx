import Router from "next/router"
import styled from "styled-components"
import { Button } from "@/components/button/normal/Button"
import { FeatureItem } from "@/feature/coach-placeholder/FeatureItem"
import { MediaRange } from "@/lib/responsive/media"

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
  padding-top: 44px;

  ${MediaRange.lessThan(`tablet`)`
    padding-top: 132px;
  `}

  ${MediaRange.lessThan(`mobile`)`
    padding-top: 36px;    
  `}
`

const Title = styled.div`
  font-family: Roboto Slab;
  font-size: 24px;
  line-height: 26px;
  text-align: center;
  color: #7d36a8;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 20px;
    line-height: 26px;
  `}
`

const SubTitle = styled.div`
  margin-top: 12px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #5b6670;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 14px;
    line-height: 18px;
  `}
`

const StyledButton = styled(Button)`
  width: 160px;
  margin-top: 28px;
  ${MediaRange.lessThan(`tablet`)`
    margin-top: 24px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 12px;
  `}
`

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  ${MediaRange.lessThan(`tablet`)`
    flex-direction: column;
    margin-top: 80px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    margin-top: 52px;
  `}
`

const TextContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${MediaRange.lessThan(`tablet`)`
    order: 2;
    margin-top: 63px;
  `}
  ${MediaRange.lessThan(`mobile`)`
    padding: 0 20px;
    margin-top: 40px;
  `}
`

const ImageContent = styled.div`
  ${MediaRange.lessThan(`tablet`)`
     order: 1;
  `}
`

const ContentTitle = styled.div`
  font-family: Roboto Slab;
  font-size: 20px;
  line-height: 26px;
  color: #5b6670;
  margin-bottom: 16px;
  ${MediaRange.lessThan(`mobile`)`
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 8px;
  `}
`

type DemoPageTemplateTypes = {
  features: string[]
  renderImage: () => JSX.Element
}

export const CoachSectionPlaceholder = (props: DemoPageTemplateTypes) => (
  <Container>
    <Title>У вас пока закрыт доступ к функционалу коуча</Title>
    <SubTitle>Отслеживайте состояние вашей заявки на главной странице</SubTitle>
    <StyledButton onClick={() => Router.push("/coach", "/coach")}>Перейти</StyledButton>
    <Content>
      <TextContent>
        <ContentTitle>На этой странице вы сможете:</ContentTitle>
        {props.features.map(feature => (
          <FeatureItem key={feature}>{feature}</FeatureItem>
        ))}
      </TextContent>
      <ImageContent>{props.renderImage()}</ImageContent>
    </Content>
  </Container>
)
