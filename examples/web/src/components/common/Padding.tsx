import styled from 'styled-components'

interface PaddingProps {
  padding?: string
  horizontal?: string
  vertical?: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  backgroundColor?: string // New prop for background color
}

const Padding = styled.div<PaddingProps>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.padding};
  padding-inline: ${(props) => props.horizontal};
  padding-block: ${(props) => props.vertical};
  padding-top: ${(props) => props.top};
  padding-bottom: ${(props) => props.bottom};
  padding-left: ${(props) => props.left};
  padding-right: ${(props) => props.right};
  background-color: ${(props) => props.backgroundColor || 'transparent'}; // Use the prop or default to transparent
`

export default Padding
