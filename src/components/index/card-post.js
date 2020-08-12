import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    flex: 1;
    display: block;
    height: 8rem;
    overflow: visible;
    position: relative;
    
    background-color: #ffdab9;
`

const ColorDiv = styled.div`
    label: color-div;
    display: block;

    height: 5px;
    background-color: ${props => props.color};

    &:hover {
        height: 6px;
    }
`

const CardBox = styled.a`
    label: card-box;
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8rem;
    max-height: 8rem;
    overflow: hidden;

    border-top-left-radius: 0;
    border-top-right-radius: 0;
    
    color: inherit;
    text-decoration: none;
    outline: none;
    background-color: inherit;

    transition: all .3s;
    &:hover {
        max-height: 10rem;
        height: 10rem;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

`

const Title = styled.div`
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 400;
    font-size: 1.333rem;
    line-height: 1;
    padding: 0.5rem;
    color: ${props => props.color};
`

 export default ({
    data,
    frontmatter,
    onHover,
}) => {
    var imageFluid = ''
    data.images.edges.forEach(im => {
        if (im.node.relativePath === frontmatter.image) {
            imageFluid = im.node.childImageSharp.fluid;
        }
    })
  
    return (
        <Container>
            <CardBox
                href={frontmatter.path}
                title={frontmatter.title}
                color={frontmatter.color}
                onMouseEnter={() => onHover({
                    image: imageFluid,
                })}
                >
                <ColorDiv color={frontmatter.color} />
                <Title color={frontmatter.color}>{frontmatter.title}</Title>
            </CardBox>
        </Container>
    )
  }