import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby';


const PostListContainer = styled.div`
  width: 14rem;
  padding: 0;
  font-family: 'IBM Plex Mono';

  margin-top: 5px;
  overflow-y: auto;
`

const Label = styled.div`
  font-size: 0.6rem;  
  font-weight: 500;
  
  padding-left: 0.6rem;
  margin-bottom: 0.25rem;

  text-transform: uppercase;
  letter-spacing: 0.04rem;
`

const Post = styled(Link)`
  display: block;

  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 0.25rem;

  font-size: 0.8rem;
  font-weight: 500;
  line-height: 0.75rem;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`

export default ({ items }) => {
  let Posts = items.map(item => (
    <Post to={'/' + item.node.slug} title={item.node.frontmatter.title} key={item.node.slug}>
      {item.node.frontmatter.title}
    </Post>
  ));
  
  return (
    <PostListContainer>
      <Label>Browse posts</Label>
      {Posts}
    </PostListContainer>
  )
}