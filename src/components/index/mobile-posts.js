import React from 'react';
import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image'

const Container = styled.div`
  flex: 1;
  display: none;
  flex-direction: row;
  flex-wrap: wrap;

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

const PostContainer = styled.a`
  flex: 1;
  min-width: 150px;
  margin: 0.5rem 0.5rem 0 0;
  position: relative;
  text-decoration:none;
  background: #FECD9A;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Thumbnail = styled(BackgroundImage)`
  display: block;
  width: 100%;
  height: 7.5rem;
`

const Headline = styled.h2`
  display: block;
  padding: 0;
  margin: 0.25rem;;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 0.9rem;
  min-height: 3.6rem;
  bottom: 0;
`

export default ({ items, images }) => {

  let postList = items.map(item => {
    let image = images.filter(i => {
      return i.node.relativePath === item.node.frontmatter.image;
    }).sort((a, b) => {
      return b.node.date - a.node.date;
    })[0]
    let fluid;
    try {
      fluid = image.node.childImageSharp.fluid;
    } catch {}

    return (
      <PostContainer key={item.node.frontmatter.title} href={`/${item.node.slug}`}>
          { fluid && 
            <Thumbnail fluid={fluid} />
          }
          <Headline>{item.node.frontmatter.title}</Headline>
      </PostContainer>
    )
  }
  )

  return (
    <Container>
      {postList}
    </Container>
  )
}