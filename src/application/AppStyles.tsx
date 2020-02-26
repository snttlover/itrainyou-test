import { createGlobalStyle } from "styled-components"

const fontFace = (
  name: string,
  src: string,
  fontWeight: string | number = "normal",
  fontStyle = "normal"
) => {
  return `
      @font-face{
          font-family: "${name}";
          src: url(${src}.woff) format("woff"),
               url(${src}.woff2) format("woff2"),
               url(${src}.ttf) format("truetype");

          font-style: ${fontStyle};
          font-weight: ${fontWeight};
      }
  `
}

export const AppStyles = createGlobalStyle`
  ${fontFace("Gilroy", "/fonts/gilroy/Gilroylight", 300, "normal")}
  ${fontFace("Gilroy", "/fonts/gilroy/Gilroyextrabold", 800, "normal")}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Gilroy;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    position: relative;
  }
`
