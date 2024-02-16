import styled from 'styled-components'

interface RowProps {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  height?: string
  width?: string
  gap?: number
  backgroundColor?: string
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'space-between'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  gap: ${(props) => props.gap || 0}px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  flex-wrap: ${(props) => props.flexWrap || 'nowrap'};
`

export default Row
