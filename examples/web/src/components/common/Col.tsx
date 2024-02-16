import styled from 'styled-components'

interface ColProps {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  height?: string
  maxWidth?: string
  width?: string
  gap?: number
  background?: string
}

const Col = styled.div<ColProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'space-between'};
  gap: ${({ gap }) => (gap ? gap + 'px' : '0px')};
  width: ${({ width }) => width || '100%'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  height: ${(props) => props.height || 'auto'};
  background-color: ${({ background }) => background || 'transparent'};
`

export default Col
