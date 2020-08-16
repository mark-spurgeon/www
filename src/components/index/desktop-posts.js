import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';


const DesktopPostsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;

  @media (max-width: 700px) {
    display: none;
  }
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

  height: 4px;
  background-color: ${props => props.color};  
  border-style: solid;
  border-width: 1px;
  border-bottom-width: 0;
  border-color: ${props => props.hovered ? '#bf9971' : props.color};  

  transition: all .3s;
  ${props => props.hovered ? `
    height: 7px;
  ` : null}
`

const CardBox = styled(Link)`
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

const TextContainer = styled.div`
  display: block;
  height: 100%;
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

const Title = styled.div`
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1;
    padding: 0.5rem;
    padding-bottom: 0;
    transition: all .2s;
    color: ${props => props.hovered ? 'black' : props.color};
`

const Description = styled.div`
  display: block;
  height: 100%;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 0.7rem;
  font-style: italic;
  line-height: 1.25;
  padding: 0.5rem;
  padding-bottom: 0;
  transition: all .4s;
  color: ${props => props.hovered ? '#e7be95' : '#6d5b49'};
`

const PostCard = ({
    frontmatter,
    onHover,
    href,
}) => {
  const [hovered, setHovered] = useState(false);
  if (frontmatter.description) {
    console.log(frontmatter.description, frontmatter.title.length)
  }
  return (
        <PostCardContainer>
            <CardBox
                to={href}
                title={frontmatter.title}
                color={frontmatter.color}
                onMouseEnter={() => {
                  setHovered(true)
                  onHover({
                    image: frontmatter.featuredImage.image.fluid,
                  })
                }}
                onMouseLeave={() => setHovered(false)}
                hovered={hovered}
                >
                <ColorDiv color={frontmatter.color} hovered={hovered} />
                <TextContainer hovered={hovered}>
                  <Title color={frontmatter.color} hovered={hovered}>{frontmatter.title}</Title>
                  { frontmatter.title.length <= 18 && frontmatter.description &&  
                    <Description hovered={hovered}>{frontmatter.description}</Description>
                  }
                </TextContainer>
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