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
  position: absolute;
  width: 100%;
  top: 0;
  z-index: -1;
  
  height: 0px;
  background-color: ${props => 'transparent'};  
  border-style: solid;
  border-width: 0;

  transition: all .4s ease;
  ${props => props.hovered ? `
    height: 10rem;
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

    border-style: solid;
    border-width: 1px;
    border-color: transparent;
    border-left-color: rgba(0,0,0,0.1);
    
    color: inherit;
    text-decoration: none !important;
    outline: none;
    background-color: inherit;

    transition: all .3s;
    ${props => props.hovered ? `
      z-index: 100;
      max-height: 10rem;
      height: 10rem;
      box-shadow: 0 0 4px 4px rgb(50, 50, 50, 0.04);
      border-right-width: 1px;
      border-top-width: 1px;
      border-color: black;
    ` : null}
`

const TextContainer = styled.div`
  display: block;
  height: 100%;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  transition: all .4s;
  ${props => props.hovered ? `
    border-color: #e7be95;
  ` : null}
`

const Title = styled.div`
    font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1rem;
    padding: 0.5rem;
    padding-bottom: 0;
    transition: all .2s;
    color: ${props => props.hovered ? 'black' : 'black'};
`

const Description = styled.div`
  display: block;
  height: 100%;
  font-family: "IBM Plex Mono", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  font-style: italic;
  line-height: 1.2rem;;
  padding: 0.5rem;
  padding-bottom: 0;
  padding-top: 0.25rem;
  transition: all .4s;
  color: ${props => props.hovered ? props.theme.colors.font : 'black'};
`

const PostCard = ({
    title = '',
    description = 'nooo',
    thumbnail,
    thumbnailImage,
    theme,
    onHover,
    href,
}) => {
  const [hovered, setHovered] = useState(false);
  console.log('theme', theme)
  return (
        <PostCardContainer>
            <CardBox
                to={href}
                title={title}
                onMouseEnter={() => {
                  setHovered(true)
                  onHover()
                }}
                onMouseLeave={() => setHovered(false)}
                hovered={hovered}
                >
                <ColorDiv hovered={hovered} theme={theme} />
                <TextContainer hovered={hovered}>
                  <Title hovered={hovered} >{title}</Title>
                  { title.length <= 18 && description &&  
                    <Description hovered={hovered}>{description}</Description>
                  }
                </TextContainer>
            </CardBox>
        </PostCardContainer>
  )
}


export default ({ items, data, setImage }) => {

  let filteredItems = items.slice(0, 4);
  let featuredPosts = filteredItems.map(item => {
    return <PostCard 
      {...item.node}
      href={item.node.url}
      data={data}
      onHover={() => setImage(item.node.thumbnailImage ? item.node.thumbnailImage.fluid : null)}
      key={item.node.url}
    />
  })

  return (
    <DesktopPostsContainer>
      {featuredPosts}
    </DesktopPostsContainer>
  )
}