import React from 'react'
import styled from '@emotion/styled'

import Label from './label'

const Container = styled.div`
    flex: 1;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 1.2rem;
    margin-bottom: 0.6rem;

    min-width: 9rem;
`

const Square = styled.div`
    display: block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.6rem;
    background-color: ${props => props.bg || 'white'};

    border-style: solid;
    border-width: 1px;
    border-color: ${props => props.outline || 'black'};
`

export default ({
    bg = 'white',
    outline = 'black',
    label = 'Untitled',
}) => (
    <Container>
        <Square bg={bg} outline={outline} />
        <Label>{label}</Label>
    </Container>
)

