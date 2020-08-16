import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image'

const Container = styled.div`
  flex: 1;
  display: none;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: stretch;
  align-content: stretch;

  padding: 0 0 0.5rem 0.5rem;
  margin-bottom: 6rem;

  background: #ffdab9;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  border-color: #f0cbab;

  @media (max-width: 600px) {
    display: flex;
  }
`

const PostLink = styled(Link)`
  flex: 1;
  min-height: 6rem;
  min-width: 150px;
  margin: 0.5rem 0.5rem 0 0;
  position: relative;
  text-decoration:none;
  background: #FECD9A;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
`

const Thumbnail = styled(BackgroundImage)`
  display: block;
  width: 100%;
  height: 100%;
`

const Headline = styled.h2`
  display: block;
  padding: 0;
  margin: 0.25rem;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 0.9rem;
  bottom: 0;
  position: absolute;
  bottom: 0;
  color: ${props => props.color || 'white'};
  margin: 0.25rem;
  padding: 0.1rem 0.25rem 0.1rem 0.25rem;
  background-color: ${props => props.outline || '#ffdab9' };
`

export default ({ items }) => {

  let postList = items.map((item, index) => {
    let { fluid } = item.node.frontmatter.featuredImage.thumbnail

    return (
      <PostLink
        to={`/${item.node.slug}`}
        key={item.node.frontmatter.title}
        title={item.node.frontmatter.title}
        index={index}
        >
          { fluid && 
            <Thumbnail fluid={fluid} index={index} />
          }
          <Headline 
            index={index} 
            color={item.node.frontmatter.color || 'black'}
            outline={item.node.frontmatter.outline}
            >
            {item.node.frontmatter.title}
          </Headline>
      </PostLink>
    )
  })

  return (
    <Container>
      {postList}
    </Container>
  )
}