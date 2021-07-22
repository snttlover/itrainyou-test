import { createGlobalStyle } from "styled-components"

export const AppStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    position: relative;
    color: #424242;
  }

  a {
    text-decoration: none;
  }
  
  button, a {  
    -webkit-tap-highlight-color:  transparent;
    user-select: none;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    70% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }
`
