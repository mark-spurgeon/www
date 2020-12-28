import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import {  css, keyframes } from '@emotion/react';

import mkoLogo from '../../media/mko-small.svg'

const Container = styled.div`
  display: block;
  max-height: 4rem;
  width: 24rem;
  
  @media (max-width: 600px) {
    width: 100%;
  }
`

const hoveredStyles = css`
  max-height: 14rem;
  height: 100%;
  border-width: 1px;
  border-bottom-width: 0;
  border-color: black;
  box-shadow: 0 0 4px 4px rgb(50, 50, 50, 0.04);
`

const MeCard = styled.div`
    label: me-card;
    display: block;
    position: absolute;
    bottom: 0;
    width: 24rem;
    padding: 0;
    margin: 0;
    overflow: hidden;

    background-color: #ffdab9;

    border-style: solid;
    border-width: 0;
    border-bottom-width: 0;
    border-color: transparent;


    transition: all .3s;
    
    height: 8rem;
    max-height: 8rem;
  
    ${props => props.hovered ? hoveredStyles: null }

    @media (max-width: 600px) {
        width: 100%;
        ${hoveredStyles};
    }
`

const LogoContainer = styled.div`
    position: relative;
    overflow: hidden;
    transition: all .3s;
    max-height: ${props => props.hovered ? '4rem': '4px'};
    height: 4rem;
    @media (max-width: 600px) {
      max-height: 4rem;
    }
    /*background: #05668d;*/
    border-style: solid;
    border-width: 1px;
    border-bottom-width: 0;
    border-color: ${props => props.hovered ? '#cca57d': 'transparent'};
    @media (max-width: 600px) {
        border-color: transparent;
    }
`
const logoKeyframes = keyframes`
    30% {
        left: 0%;
        transform: rotate(0deg)
    }
    60% {
        left: 80%;
        transform: rotate(490deg)
    }
`

const Logo = styled.div`
    height: 100%;
    width: 64px;
    margin-left: 0.5rem;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;

    position: absolute;
    left: 0%;
    animation: ${logoKeyframes} 3s ease infinite;
`

const TextContainer = styled.div`
    padding: 0;
    margin: 0;

    @media (max-width: 600px) {
      max-height: 4rem;
    }
    transition: all .2s;
`

const Name = styled.div`
    font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    font-size: 1.333rem;
    line-height: 1;
    padding-left: 0.5rem;
    padding-top: 0.5rem;
    color:black;
`

const Description = styled.div`
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 400;
    font-size: 0.8rem;
    font-weight: 400;
    font-style: italic;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.25rem;
    color: black;
`

const SocialBox = styled.div`
    margin-top: 0.5rem;
    height: 2rem;
    display: flex;

    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    border-color: rgba(0,0,0,0.1);
`

const Social = styled(Link)`
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    line-height: 1.8rem;
    flex: 1;
    padding-left: 0.5rem;
    padding-right: 0.5rem;


    color: ${props => props.color || 'black'};

    border-style: solid;
    border-width: 0;
    border-left-width: 1px;
    border-color: rgba(0,0,0,0.1);
`

const SocialIcon = styled(Link)`
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.8rem;
    width: 2rem;
    text-decoration: none;
    text-align: center;

    color: ${props => props.color || 'black'};

    border-style: solid;
    border-width: 0;
    border-left-width: 1px;
    border-color: rgba(0,0,0,0.1);
`

const SeriousBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 3rem;
    padding-right: 0.5rem;
    /*background: #f6cfb3;*/
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    border-color: ${props => props.hovered ? '#e7be95' : 'transparent'};
    margin-top: ${props => props.hovered ? '0' : '2rem'};
    transition: all .3s .1s;
    
    @media (max-width: 600px) {
      border-color: #e7be95;
      margin-top: 0rem;
    }
`


const LinkAnimation = keyframes`
    from, 50%, to {
        background-color: #3F6DF3;
    }

    25%, 80% {
        background-color: #D51A53;
    }

    90% {
        background-color: #55BF62;
    }

`

const SeriousLink = styled(Link)`
    font-family: "Public Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.75rem;
    line-height: 2rem;
    text-decoration: underline;
    flex: 1;

    padding: 0.15rem 0.6rem 0.15rem 0.6rem;
    color: black;
    &:hover {
        text-decoration: underline;
    }

`

export default ({onHover}) => {
    const [hovered, setHovered] = useState(false);

    const onMouseEnter = () => {
        onHover();
        setHovered(true);
    }
    const onMouseLeave = () => {
        setHovered(false);
    }
    return (
      <Container>
        <MeCard onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} hovered={hovered} >
            <TextContainer hovered={hovered}>
                <Name>Mark Spurgeon</Name>
                <Description>
                    Hi! I'm a geographer/urbanist studying at the University of Geneva.
                    I make cartography, websites and sometimes artwork :)
                </Description>

                <SocialBox>
                    <Social to="mailto:markspurgeon96@hotmail.com" title="Marko's E-mail">
                        markspurgeon96@hotmail.com
                    </Social>
                    <SocialIcon to="https://github.com/the-duck" target="_blank" color="rgb(40, 50, 250)" title="Marko's Github" nobg>
                        GH
                    </SocialIcon>
                    <SocialIcon to="https://instagram.com/marko.studio" target="_blank" color="rgb(200, 50, 80)" title="Marko's Instagram" nobg>
                        IN
                    </SocialIcon>
                </SocialBox>

                <SeriousBox hovered={hovered}>
                    <SeriousLink to="/cv" title="Marko's CV">
                        CV & Skills
                    </SeriousLink>
                    <SeriousLink to="/links" title="Marko's Links" nobg>
                        Links & references
                    </SeriousLink>
                </SeriousBox>
            </TextContainer>
        </MeCard>
      </Container>
    )
  }