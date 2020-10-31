import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Head from '../components/head'
import Footer from '../components/footer'



const Container = styled.main`
  position: absolute;
  top: 0;
  left: 20%;
  height: 100%;
  width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 12pt;
`

const Box = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 100%;
  max-width: 100%;
`

const Heading = styled.h2`
  color: #e60000;
  font-weight: 400;
`

const PostLink = styled(Link)`
  display: block;
  color: #7896ff;
`

export default ({
  data: {
    posts: {
      edges
    }
  }
}) => {
  let posts = edges.map(item => <PostLink to={`/${item.node.slug}`}>{item.node.frontmatter.title}</PostLink>)
  return (
    <Container>
      <Helmet>
        <Head />
        <title>404 | Marko [Mark Spurgeon]</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <Box>
        <Heading>404 - Page not found</Heading>
        <p>This is not what you've been looking for.. Sorry !</p>
        <p>Is it one of these links ?</p>
        {posts}
      </Box>
      <Footer />
    </Container>
  )
}

export const pageQuery = graphql`
  query {
    posts : allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          frontmatter {
            title
          }
          slug
        }
      }
    }
  }
`