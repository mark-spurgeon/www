import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import {
    HBox, VBox,
    Button,
    TextInput,
    Label,
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
  border-color: rgb(50, 50, 50);

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
        `;
    }
  }};
  transition: all 0.6s;
`

const InputContainer = styled.div`
  flex: 1;
`

const IdContainer = styled.div`
  width: 1rem;
  font-size: 0.6rem;
  font-weight: bold;
`

const Input = ({
  label = 'input',
  value = '',
  onChange,
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <TextInput value={value} onChange={onChange} />
  </InputContainer>
)

export default ({
  input,
  index,
  onChange,
}) => {
  const [changed, setChanged] = useState(false)
  const [data, setData] = useState({
    name: '',
    type: '',
    category: '',
    data: '',
    tags: '',
    id: 0,
  })

  useEffect(() => {
    setData(input)
  }, [input])

  useEffect(() => {
    if (input !== data) {
      setChanged(true)
    } else {
      setChanged(false)
    }
  }, [input, data])

  const onInput = (item, e) => {
    let newData = { ...data};
    newData[item] = e.target.value;
    newData.status = (newData.status === 'new') ? 'visible' : newData.status;
    setData(newData)
  }

  const onDelete = () => {
    let newData = {...data, status: 'deleted'}
    setData(newData);
    
    // Update data
    setTimeout(() => {
      onChange(newData);
    }, 1000)
  }

  return (
    <LinkContainer key={index} status={data.status} >
      <HBox>
        <IdContainer>{index}</IdContainer>
        <VBox>
          <Input label="title" value={data.name} onChange={(e) => onInput('name', e)}/>
          <HBox>
            <Input label="type" value={data.type} onChange={(e) => onInput('type', e)} />
            <Input label="category" value={data.category} onChange={(e) => onInput('category', e)} />
          </HBox>
          <Input label="link / other data" value={data.data} onChange={(e) => onInput('data', e)} />

        </VBox>
        <VBox style={{maxWidth: '2rem', justifyContent: 'flex-end'}}>
          <Button onClick={() => onDelete()} title="delete" color="#e2062c" disabled={data.status === 'deleted'} invert>X</Button>
          <Button onClick={() => onChange(data)} title="update" disabled={!changed || data.status === 'deleted'} color="#42b438">U</Button>
        </VBox>
      </HBox>
    </LinkContainer>
  )
}