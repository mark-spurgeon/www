import React from 'react'
import styled from '@emotion/styled'

import {
  HBox, VBox,
  Input,
  Id,
} from '../ui.js'

const CategoryContainer = styled.div`
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

  transition: all 0.6s;
`


export default ({
  input,
  index,
  onChange,
}) => {

  const onInput = (item, e) => {
    let newData = { ...input };
    newData[item] = e.target.value;
    newData.status = (newData.status === 'new') ? 'visible' : newData.status;
    onChange(newData)
  }


  return input ? (
    <CategoryContainer>
      <HBox>
        <Id>{index}.</Id>
        <VBox style={{marginRight: 5}}>
          <HBox>
            <Input label="name" value={input.name || ''} onChange={(e) => onInput('name', e)}/>
            <Input label="slug" value={input.slug || ''} onChange={(e) => onInput('slug', e)}/>
          </HBox>
          <HBox>
            <Input label="colour" value={input.colour || '' } onChange={(e) => onInput('colour', e)} />
            <Input label="order" value={input.order || ''} onChange={(e) => onInput('order', e)} />
          </HBox>
        </VBox>
      </HBox>    
    </CategoryContainer>
  ): null;
}