import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Select from 'react-select'

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
  height: 1.6rem;
  font-family: 'IBM Plex Mono';
  font-weight: 400;
  font-size: 0.8rem;
  text-align: center;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.invert ? 'transparent' : '#e7be95'};
  background-color: ${props => props.invert ? props.color || 'black' : '#ffdab9'};
  cursor: pointer;

  color: ${props => props.invert ? '#ffdab9' : props.color || 'black'};
  opacity: ${props => props.disabled ? '0.4' : '1'};
`

export const SquareButton = styled.button`
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
  border-color: ${props => props.invert ? 'transparent' : '#e7be95'};;

  opacity: ${props => props.disabled ? '0.4' : '1'};
`

export const TabButton = styled.button`
  flex: 1;
  background: ${props => props.selected ? '#7896ff' : 'transparent'};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.selected ? '#5679de' : '#e7be95'};

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
        border-left-width: 0;
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

const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#ffdab9',
    borderRadius: 0,
    fontSize: '12pt'
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#e7be95',
    borderRadius: 0,
    height: 24,
    minHeight: 24,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    height: 24,
  }),
  input: (p, s) => ({
    ...p,
    margin: 0,
  }),
  indicatorsContainer: (p, s) => ({
    ...p,
    padding: 0,
    height: 24,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorContainer: (p, s) => ({
    ...p,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    transition: 'all .1s',
    backgroundColor: state.isSelected ? '#7896ff' : (state.isFocused ? '#D2C3D0' : 'transparent'),
  })
}

export const SelectInput = ({
  label = 'input',
  value = '',
  options = [],
  onChange,
}) => {
  const onChangeMiddleware = (option) => {
    onChange(option.value)
  }
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Select
        options={options}
        value={options.filter(op => op.value === value)}
        isSearchable={false}
        onChange={onChangeMiddleware}
        styles={selectStyles}
        />
    </InputContainer>
  )
}
