import React from "react"
import styled from "styled-components"
import { MediaRange } from "#/lib/responsive/media"

export const Pictures = () => (
  <Container>
    <Picture src='https://lh3.googleusercontent.com/proxy/XXn_yxJ723GhmlNng2zfTUJEnMmNkYhRMfvRx1wK2ZOL_Vv1ZwLPhrrMBmlxySiYVbS9cZDTaOEheXgjjk6c0fsyyaPgwTN86fFbiT_o4o5Tz2DsYJzEnXjIPl0Oos1VPs9LDotQ_JtPC9RwXrlnzTNiieKnSjEO_BFiGwTL8w' />
    <Picture src='https://lh3.googleusercontent.com/proxy/XXn_yxJ723GhmlNng2zfTUJEnMmNkYhRMfvRx1wK2ZOL_Vv1ZwLPhrrMBmlxySiYVbS9cZDTaOEheXgjjk6c0fsyyaPgwTN86fFbiT_o4o5Tz2DsYJzEnXjIPl0Oos1VPs9LDotQ_JtPC9RwXrlnzTNiieKnSjEO_BFiGwTL8w' />
    <Picture src='https://lh3.googleusercontent.com/proxy/XXn_yxJ723GhmlNng2zfTUJEnMmNkYhRMfvRx1wK2ZOL_Vv1ZwLPhrrMBmlxySiYVbS9cZDTaOEheXgjjk6c0fsyyaPgwTN86fFbiT_o4o5Tz2DsYJzEnXjIPl0Oos1VPs9LDotQ_JtPC9RwXrlnzTNiieKnSjEO_BFiGwTL8w' />
    <Picture src='https://lh3.googleusercontent.com/proxy/XXn_yxJ723GhmlNng2zfTUJEnMmNkYhRMfvRx1wK2ZOL_Vv1ZwLPhrrMBmlxySiYVbS9cZDTaOEheXgjjk6c0fsyyaPgwTN86fFbiT_o4o5Tz2DsYJzEnXjIPl0Oos1VPs9LDotQ_JtPC9RwXrlnzTNiieKnSjEO_BFiGwTL8w' />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  padding-right: 6px;
`

type PictureTypes = {
  src: string
}

const Picture = styled.div<PictureTypes>`
  cursor: pointer;
  height: 144px;
  width: calc(33% - 4px);
  margin-right: 4px;
  margin-bottom: 4px;
  background: url("${props => props.src}");
  background-position: center;
  background-size: cover;

  ${MediaRange.lessThan(`mobile`)`
    width: 100%;
  `}
`
