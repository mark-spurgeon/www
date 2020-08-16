import React from 'react'
import styled from '@emotion/styled'

export const Label = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  color: ${props => props.color || 'black'};
`

export const TextInput = styled.input`
    display: block;
    width: 100%;
    padding: 0;

    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;

    border-style: none;
    background: transparent;
    outline: none;
`

export const VBox = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`
export const HBox = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
`

export const Button = styled.button`
  display: block;
  width: 2rem;
  height: 2rem;
  border-style: none;
  background-color: transparent;

  text-align: center;

  font-weight: bold;
  font-size: 0.8rem;
  background-color: ${props => props.invert ? 'transparent' : props.color || 'black'};
  color: ${props => props.invert ? props.color || 'white' : 'black'};;
  cursor: pointer;
  border-radius: 1px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.invert ? 'transparent' : 'black'};;

  opacity: ${props => props.disabled ? '0.4' : '1'};
`

export const TabButton = styled.button`
  flex: 1;
  background: ${props => props.selected ? 'rgb(120, 150, 255)' : 'transparent'};
  border-style: solid;
  border-width: 1px;
  border-color: #e7be95;

  padding: 0.5rem;
  font-family: 'IBM Plex Mono', monospace;
  cursor: pointer;

  ${props => {
    switch(props.where) {
      case 'left': return `
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right-width: 0;
      `
      case 'right': return `
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      `
      default: return null;
    }
  }}
`

const InputContainer = styled.div`
  flex: 1;
`
export const Input = ({
  label = 'input',
  value = '',
  onChange,
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <TextInput value={value} onChange={onChange} />
  </InputContainer>
)

export const Id = styled.div`
  width: 1rem;
  font-size: 0.6rem;
  font-weight: 400;
`