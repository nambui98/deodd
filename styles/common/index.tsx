import styled from "styled-components"

export const TEXT_STYLE = (fontSize: number, fontWeight: number, color?: string) => {
  return color ? {fontSize: fontSize, fontWeight: fontWeight, color: color} : {fontSize: fontSize, fontWeight: fontWeight}
}

export const Container = styled.div({
  maxWidth: 1152,
  padding: '0 16px',
  marginLeft: 'auto',
  marginRight: 'auto',
})