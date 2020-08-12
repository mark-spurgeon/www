import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Img from 'gatsby-image';

import Head from './head'

const Container = styled.div`
    display: block;
    position: relative;
    height: 300px;
    max-height: 400px;
    width: 100%;
    margin-bottom: 1rem;

    @media (max-width: 800px) {
        height: 200px;
    }
    @media (max-width: 500px) {
        height: 100px;
    }
`

const ImageContainer = styled.div`
    display: ${props => props.nobg ? 'none': 'block'};
    min-width: 100%;
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    height: 400px;
    overflow: hidden;

    @media (max-width: 800px) {
        top: 0;
        height: 200px;
    }
    @media (max-width: 500px) {
        height: 100px;
    }
`

const TextContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: -1.3rem;
`

const Title = styled.span`
    display: block;
    color: ${props => props.color};
    text-shadow: -1px 1px 0 ${props => props.outline},
        1px 1px 0 ${props => props.outline},
        1px -1px 0 ${props => props.outline},
        -1px -1px 0 ${props => props.outline};
    font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont;
    font-weight: 300;
    font-size: 2.2rem;
    text-rendering: geometricPrecision;
    max-width: 48rem !important;
    margin: 0 auto;
    text-align: center;
    @media (max-width: 800px) {
        font-size: 1.4rem;
    }
`
const Authors = styled.span`
    display: block;
    color: ${props => props.color};
    text-shadow: -1px 1px 0 ${props => props.outline},
        1px 1px 0 ${props => props.outline},
        1px -1px 0 ${props => props.outline},
        -1px -1px 0 ${props => props.outline};
    font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont;
    font-size: 1rem;
    font-weight: 500;
    line-height: 2.4rem;
    text-rendering: optimizeLegibility;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    max-width: 20rem;
    margin: 0 auto;
    text-align: center;
    
    @media (max-width: 800px) {
        font-size: 0.85rem;
    }
`

export default ({
    context: { frontmatter },
    color = 'black',
    outline = '#ffdab9',
    nobg = false,
}) => { 
    let query = graphql`
    query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
    const data = useStaticQuery(query)
    var imageFluid = ''
    data.images.edges.forEach(im => {
        if (im.node.relativePath === frontmatter.image) {
            imageFluid = im.node.childImageSharp.fluid;
        }
    })


    return (
        <Container>
            <Helmet>
                <Head />
                <title>{frontmatter.title}</title>
                <meta 
                    name="description" 
                    content={frontmatter.description || frontmatter.title} />
            </Helmet>
            <ImageContainer nobg={nobg}><Img fluid={imageFluid} /></ImageContainer>
            <TextContainer>
                <Title color={frontmatter.color || color} outline={frontmatter.outline || outline}>
                    {frontmatter.title}
                </Title>
                <Authors color={frontmatter.color || color} outline={frontmatter.outline || outline}>
                    {frontmatter.authors || 'Mark'}
                </Authors>
            </TextContainer>
        </Container>
    )
}