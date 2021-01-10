import React from 'react';
import { graphql } from "gatsby";
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import FooterMeta from '../footer'
import Head from '../head'


const Body = ({ content, theme, images }) => content.map((item, key) => {
  // Paragraph
  if (item.type === 'text') {
    let Paragraph = styled.p`
      max-width: 34rem;
      margin: 1rem auto;
      font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: justify;
      color: ${props => props.theme.colors.font || 'black'};
      
      p {
        margin: 0;
      }

      a {
        color: inherit;
      }
    `
    return (
      <Paragraph key={key} theme={theme}>
        <ReactMarkdown disallowedTypes={['paragraph']} unwrapDisallowed>
          {item.value}
        </ReactMarkdown>
      </Paragraph>
    )
  } 

  // H1
  if (item.type === 'heading') {
    let Heading = styled.h2`
      max-width: 34rem;
      margin: 0rem auto;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: 600;
      color: ${props => props.theme.colors.font || 'black'};
    `
    return <Heading key={key} theme={theme}>{item.value}</Heading>
  } 

  // H2
  if (item.type === 'subheading') {
    let SubHeading = styled.h3`
      max-width: 34rem;
      margin: 0rem auto;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 1.25rem;
      line-height: 1.5rem;
      font-weight: 600;
      color: ${props => props.theme.colors.font || 'black'};
    `
    return <SubHeading key={key} theme={theme}>{item.value}</SubHeading>
  } 

  // Image
  else if (item.type === 'image') {
    let Image = styled(Img)`
      display: block;
      width: 34rem;
      max-width: 100%;
      margin: 0rem auto;
      background-color: transparent;
    `
    let ImageSrc = styled.img`
      display: block;
      width: 34rem;
      max-width: 100%;
      margin: 0rem auto;
      background-color: transparent;
    `
    let imageName = item.value.split('.')[0];
    if (images && images.edges) {
      let imageNode = images.edges.filter(obj => obj.node.name === imageName)[0];
      let imageFluid = imageNode && imageNode.node.fluid;
      if (imageFluid) {
        return <Image key={key} fluid={imageFluid} />;
      } else if (imageNode.node.thumbnail) {
        return <ImageSrc src={imageNode.node.thumbnail}></ImageSrc>
      }
    }
  } 

  // Image Wide
  else if (item.type === 'imageWide') {
    let ImageWide = styled(Img)`
      display: block;
      width: ${props => props.fluid.presentationWidth}px;
      max-width: 100%;
      margin: 0rem auto;
      background-color: transparent;
    `
    let ImageWideSrc = styled.img`
      display: block;
      width: 800px;
      max-width: 100%;
      margin: 0rem auto;
      background-color: transparent;
    `
    let imageName = item.value.split('.')[0];
    let imageNodes = images.edges.filter(obj => obj.node.name === imageName);
    if (imageNodes.length > 0) {
      let imageFluid = imageNodes[0].node.fluid;
      if (imageFluid) {
        return <ImageWide fluid={imageFluid} key={key} />;
      } else if (imageNodes[0].node.thumbnail) {
        return <ImageWideSrc src={imageNodes[0].node.thumbnail}></ImageWideSrc>
      }
    }
  } 
  
  // Iframe
  else if (item.type === 'iframe') {
    let IFrame = styled.iframe`
      margin: 0 auto;
      display: block;
      max-width: 100%;
    `
    return <IFrame key={key} frameBorder="0" {...item.value} />
  } 

  // ignore if other
  else { return null }
}) 

const Article = styled.article`
  display: block;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background || 'white'};
  padding: 1rem;
  flex:1;
`

const Kicker = styled.kicker`
  display: block;
  max-width: 34rem;
  margin: 0 auto;
  font-weight: 400;
  font-style: italic;
  text-transform: lowercase;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.font || 'black'};
`

const Headline = styled.h1`
  max-width: 34rem;
  margin: 0 auto;
  margin-top: 2rem;
  font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2rem;
  color: ${props => props.theme.colors.font || 'black'};
`

const Footer = styled.div`  
  max-width: 34rem;
  margin: 0 auto;
  padding-top: 1rem;
  font-size: 0.8rem;
  font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  color: ${props => props.theme.colors.font || 'black'};
`

export default ({
  pageContext,
  data,
}) => {
  let { project, images } = data;
  let { theme } = project;
  console.log(project)
  const { body } = JSON.parse(project.article);

  return (
  <Article theme={theme}>
      <Head>
        <title>{project.title} - Mark Spurgeon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="description" content={project.description || ''} />
        <meta name="keywords" content={project.keywords || ''} />
        <meta name="author" content="Mark Spurgeon" />
      </Head>
      
      { project.kicker && 
        <Kicker theme={theme}>
          {project.kicker}
        </Kicker>
      }
      
      <Headline theme={theme}>
        {project.title}
      </Headline>
      
      <Body content={body} theme={theme} images={images} />
      <Footer theme={theme} >
        Copyright © {new Date().getFullYear()} Mark Spurgeon
      </Footer>
      <FooterMeta />
  </Article>
)}

export const query = graphql`
  query($name: String!, $language: String! ) {
    project : project(name: {eq: $name}, language:{eq: $language}) {
      name
      language
      date
      title
      article
      theme {
        colors {
          font
          background
        }
      }

      description
      keywords
    }

    images : allProjectImage(filter: {project: {eq: $name}}) {
      edges {
        node {
          project
          name
          fluid {
            base64
            aspectRatio
            src
            srcSet
            srcSetType
            sizes
            originalImg
            density
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  }
`
