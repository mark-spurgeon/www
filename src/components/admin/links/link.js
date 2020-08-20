import React from 'react'
import styled from '@emotion/styled'
import Select from 'react-select'

import {
    HBox, VBox,
    Button,
    Input,
    Id,
    SelectInput,
} from './ui.js'

const LinkContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 28rem;

  margin: 0 auto;
  padding: 0.5rem;

  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-color: #e7be95;

  font-family: 'IBM Plex Mono', monospace;
  
  ${props => {
    switch (props.status) {
      case 'new':
        return `
          background-color: #bce2b1;
          max-height: 28rem;
          overflow: hidden;
        `;
      case 'deleted':
        return `
          background-color: red;
          opacity: 0.3;
          padding: 0 0.5rem 0 0.5rem;
          border-width: 0;
          max-height: 0;
          overflow: hidden;
        `;
      case 'visible':
        return `
          max-height: 28rem;
          overflow: visible;
        `
      default : 
        return `
          max-height: 0;
          opacity: 0;
        `;
    }
  }};
  transition: all 0.6s;
`

export default ({
  input,
  index,
  onChange,
  categoryOptions = [],
}) => {

  const onInput = (item, e) => {
    let newData = { ...input};
    newData[item] = e.target.value;
    newData.status = (newData.status === 'new') ? 'visible' : newData.status;
    onChange(newData)
  }

  const onSelectInput = (item, e) => {
    let newData = { ...input};
    newData[item] = e;
    newData.status = (newData.status === 'new') ? 'visible' : newData.status;
    onChange(newData)
  }

  const onDelete = () => {
    let newData = {...input, status: 'deleted'}    
    // Update data
    setTimeout(() => {
      onChange(newData);
    }, 1000)
  }

  return input ? (
    <LinkContainer key={index} status={input.status} >
      <HBox>
        <Id>{index}.</Id>
        <VBox style={{marginRight: 5}}>
          <Input label="title" value={input.name} onChange={(e) => onInput('name', e)}/>
          <Input label="link" value={input.data} onChange={(e) => onInput('data', e)} />
          <HBox>
            <Input label="type" value={input.type} onChange={(e) => onInput('type', e)} />
            <SelectInput label="category" options={categoryOptions} value={input.category} onChange={(e) => onSelectInput('category', e)} />
          </HBox>
        </VBox>
        <VBox style={{maxWidth: '4rem', justifyContent: 'flex-start'}}>
          <Button onClick={() => onDelete()} title="delete" color="#e2062c" disabled={input.status === 'deleted'}>
            Delete
          </Button>
        </VBox>
      </HBox>
    </LinkContainer>
  ): null;
}