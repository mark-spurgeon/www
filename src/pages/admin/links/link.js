import React from 'react'
import styled from '@emotion/styled'

import {
    HBox, VBox,
    Button,
    Input,
    Id,
} from './ui.js'

const LinkContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 28rem;
  overflow: hidden;

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
        `;
      case 'deleted':
        return `
          background-color: red;
          opacity: 0.3;
          padding: 0 0.5rem 0 0.5rem;
          border-width: 0;
          max-height: 0;
        `;
      case 'visible':
        return `
          max-height: 28rem;
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
}) => {

  const onInput = (item, e) => {
    let newData = { ...input};
    newData[item] = e.target.value;
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
          <HBox>
            <Input label="type" value={input.type} onChange={(e) => onInput('type', e)} />
            <Input label="category" value={input.category} onChange={(e) => onInput('category', e)} />
          </HBox>
          <Input label="link / other data" value={input.data} onChange={(e) => onInput('data', e)} />
        </VBox>
        <VBox style={{maxWidth: '2rem', justifyContent: 'flex-end'}}>
          <Button onClick={() => onDelete()} title="delete" color="#e2062c" disabled={input.status === 'deleted'} invert>X</Button>
        </VBox>
      </HBox>
    </LinkContainer>
  ): null;
}