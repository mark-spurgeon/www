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

  font-weight: bold;
  font-size: 0.8rem;
  background-color: ${props => props.invert ? 'transparent' : props.color || 'black'};
  color: ${props => props.invert ? props.color || 'white' : 'black'};;
  cursor: pointer;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.invert ? 'transparent' : 'black'};;

  opacity: ${props => props.disabled ? '0.4' : '1'};
  &:hover {
    text-decoration: underline;
  }
`

export default () => <div />