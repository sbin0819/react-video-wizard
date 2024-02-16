import styled from 'styled-components'

const SizedBox = styled.div<{ height?: string | number; width?: string | number }>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width || '100%')};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height || '100%')};
`

export default SizedBox
