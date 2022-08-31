import { css } from '@emotion/react'

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: "Open Sans", "Source Sans Pro", Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
`

export default globalStyles
