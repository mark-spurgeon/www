import React, { useState } from 'react';
import styled from '@emotion/styled';

const DesktopPostsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
`

const PostCardContainer = styled.div`
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
  
  transition: all .3s;
  ${props => props.hovered ? `
    height: 7px;
  ` : null}
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
    ${props => props.hovered ? `
      z-index: 100;
      max-height: 10rem;
      height: 10rem;
      box-shadow: 0 0 4px 4px rgb(50, 50, 50, 0.04);
    ` : null}
`

const Title = styled.div`
  display: block;
  height: 100%;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1;
    padding: 0.5rem;
    color: ${props => props.hovered ? 'black' : props.color};

    border-width: 0;
    border-left-width: 1px;
    border-right-width: 1px;
    border-style: solid;
    border-color: transparent;
    transition: all .4s;
    ${props => props.hovered ? `
      border-color: #e7be95;
    ` : null}
`

const PostCard = ({
    frontmatter,
    onHover,
    href,
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
        <PostCardContainer>
            <CardBox
                href={href}
                title={frontmatter.title}
                color={frontmatter.color}
                onMouseEnter={() => {
                  setHovered(true)
                  onHover({
                    image: frontmatter.featuredImage.childImageSharp.fluid,
                  })
                }}
                onMouseLeave={() => setHovered(false)}
                hovered={hovered}
                >
                <ColorDiv color={frontmatter.color} hovered={hovered} />
                <Title color={frontmatter.color} hovered={hovered}>{frontmatter.title}</Title>
            </CardBox>
        </PostCardContainer>
  )
}


export default ({ items, data, setImage }) => {

  let filteredItems = items.slice(0, 4);
  let featuredPosts = filteredItems.map(item => {
    // TODO: replace 'true' with item.node.frontmatter.featured
    return <PostCard 
      href={`/${item.node.slug}`}
      frontmatter={item.node.frontmatter} 
      data={data}
      onHover={({ image }) => setImage(image)}
      key={item.node.slug}
    />
  })

  return (
    <DesktopPostsContainer>
      {featuredPosts}
    </DesktopPostsContainer>
  )
}