import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Img from 'gatsby-image';

import Head from './head'

import mkoLogo from '../media/mko-small.svg'

const Container = styled.div`
  display: block;
  position: relative;
  height: 470px;
  max-height: 470px;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: 800px) {
      height: 320px;
  }
  @media (max-width: 500px) {
      height: 140px;
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

  border-style: solid;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: ${props => props.color};

  @media (max-width: 800px) {
    top: 0;
    height: 200px;
  }
  @media (max-width: 500px) {
    display: none;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 268px;

  @media (max-width: 800px) {
    top: 168px;
  }
  @media (max-width: 500px) {
    top: 0;
  }
`

const LogoContainer = styled(Link)`
  display: block;
  width: 64px;
  height: 56px;
  margin: 0 auto;
  background-color: #ffdab9;
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0px;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.color};

  transition: all .3s;
  
  &:hover {
    box-shadow: 0 1px 4px 3px rgba(0.4, 0.4, 0.5, 0.1);
  }

  @media (max-width: 500px) {
    width: 48px;
    height: 48px;
    border-style: none;
    border-radius: 0;
  }
`


const Title = styled.span`
  display: block;
  color: ${props => props.color};
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont;
  font-weight: 300;
  font-size: 2.2rem;
  font-style: italic;
  text-rendering: geometricPrecision;
  max-width: 48rem !important;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 800px) {
    font-size: 1.40rem;
    font-weight: 400;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`
const Authors = styled.span`
    display: block;
    color: ${props => props.color};
    font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont;
    font-size: 1rem;
    font-weight: 500;
    line-height: 2.4rem;
    text-rendering: optimizeLegibility;
    max-width: 20rem;
    margin: 0 auto;
    text-align: center;
    
    @media (max-width: 800px) {
      font-size: 0.90rem;
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
        <ImageContainer nobg={false} color={frontmatter.color || color}>
          <Img fluid={imageFluid} />
        </ImageContainer>
        <TitleContainer>
          <LogoContainer to={"/"} src={mkoLogo} color={frontmatter.color || color} />
          <Title color={frontmatter.color || color} outline={frontmatter.outline || outline}>
              {frontmatter.title}
          </Title>
          <Authors color={frontmatter.color || color} outline={frontmatter.outline || outline}>
              <i style={{fontWeight: '200', fontSize: '0.9rem'}}>Written by </i>  
              {frontmatter.authors || 'Mark Spurgeon'}
          </Authors>
        </TitleContainer>
      </Container>
    )
}