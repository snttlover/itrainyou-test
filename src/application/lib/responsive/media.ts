import { generateMedia } from "styled-media-query"

export const MediaRange = generateMedia({
  mobile: '480px',
  tablet: '769px',
  laptop: '1024px',
  desktop: '1280px'
})
