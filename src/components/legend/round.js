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
`

const Round = styled.div`
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.25rem;
    margin-right: 0.75rem;
    background-color: ${props => props.bg || 'white'};

    border-style: solid;
    border-width: 1px;
    border-color: ${props => props.outline || 'black'};
    border-radius: 50%;
`

export default ({
    bg = 'white',
    outline = 'black',
    label = 'Untitled',
}) => (
    <Container>
        <Round bg={bg} outline={outline} />
        <Label>{label}</Label>
    </Container>
)

