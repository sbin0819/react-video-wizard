import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Video from './components/Video'

const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0; 
    padding: 0;
    background-color: #000;
    font-family: 'Roboto', sans-serif;
  }

  a{
    text-decoration: none;
    color: inherit;
  }
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 10px;
    vertical-align: baseline;
  }
  ol, ul{
    list-style: none;
  }
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Video />
    </>
  )
}

export default App
