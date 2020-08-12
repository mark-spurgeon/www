import React from 'react'
import styled from '@emotion/styled'
import Legend from './legend'
import Label from './label'
import Square from './square'
import Round from './round'

const VBox = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`
const HBox = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  flex-wrap: wrap;
`


export {
    Legend,
    Label, VBox, HBox,
    Square,
    Round,
}