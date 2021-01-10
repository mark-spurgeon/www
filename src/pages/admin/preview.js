import fetch from 'isomorphic-fetch'
import * as queryString from "query-string";

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSWR, { mutate } from 'swr'


import {
  MenuItem,
  Navbar,
  Spinner,
  Breadcrumbs,
  Breadcrumb,
  ControlGroup,
  ButtonGroup,
  Toast, Toaster,
  Button,
  Callout,
  Alignment,
  Position,
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import '@blueprintjs/core/lib/css/blueprint.css'

import Head from '.../../components/head'
import Footer from '.../../components/footer'

import Component from '.../../components/templates/project'


const fetcher = (url) => fetch(url).catch(e => console.error(e)).then(res => res.json()); 

const breadcrumbs = [
  { href:'/admin', icon: 'application' },
  { href:'/admin/preview', text: 'preview', current: true },
]

const breadcrumbRenderer = ({ text, ...props }) => {
  return <Breadcrumb {...props}>{text}</Breadcrumb>
}

const projectItemRenderer = (project, { handleClick }) => (
  <MenuItem
    key={project.name}
    onClick={handleClick}
    text={project.name}
    label={(project.type === 'remote') ? 'R': 'L'}
    shouldDismissPopover
  />
)

const languages = [
  {name: 'English', code: 'en'},
  {name: 'Français', code: 'fr'},
]

const languageRenderer = (language, { handleClick }) => (
  <MenuItem
    key={language.code}
    onClick={handleClick}
    text={language.name}
    label={language.code}
    shouldDismissPopover
  />
)

const Container =  styled.div`
  background: rgb(230,230,230);
  display: block;
  width: 100%;
  opacity: ${props => props.isValidating ? '0.7' : '1'};
`

export default ({
  location
}) => {
  let [error, setError] = useState(null);
  // let [projects, setProjects] = useState([]);
  let [url, setUrl] = useState(null);
  let [project, setProject] = useState();
  let [language, setLanguage] = useState('en');
  
  let { data: projects } = useSWR(`/api/projects`);
  let { data, isValidating, error: projectError } = useSWR(() => url, fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    let { name, language } = queryString.parse(location.search);
    if (name && language) {
      setProject({ name, path: 'unknown'});
      setLanguage(language);
    }
  }, [])

  useEffect(() => {
    if (project && language) {
      setUrl(`/api/preview?name=${project.name}&language=${language}`);
      setError(null)
    }
  }, [project, language])

  useEffect(() => {
    setError(projectError)
  }, [projectError, isValidating])

  useEffect(() => {
    if (projects && project) {
      projects.forEach(pro => {
        if (pro.name === project.name) {
          setProject(pro)
        }
      })
    }
  }, [projects, project])


  const openFile = () => {
    console.log(project.path);
    if (project.path.startsWith('/projects/')) {
      // dropbox;
      let nurl = `https://www.dropbox.com/home${project.path}`;
      window.open(nurl, '_blank');
    }
  }

  const deploy = async () => {
    let response = await fetcher('/api/deploy');
    console.log('deploying');
  }

  return (
    <>
    <Head>
      <title>Preview</title>
      <meta name="robots" content="noindex"></meta>
    </Head>
    <Navbar >
      <Navbar.Group align={Alignment.LEFT}>
        <Breadcrumbs
          currentBreadcrumbRenderer={breadcrumbRenderer}
          items={breadcrumbs}
        />        
      </Navbar.Group>


      <Navbar.Group align={Alignment.RIGHT}>
        {project && project.type === 'remote' &&
          <>
            <Button 
              icon="folder-open"
              label="Open in Dropbox"
              minimal={true}
              onClick={openFile}
            />
            <Navbar.Divider />
          </>
        }
        <ButtonGroup outline={true}>
          <Select
            items={ projects || []}
            itemRenderer={projectItemRenderer}
            onItemSelect={setProject}
            filterable={false}
            minimal={true}
            >
          <Button
              text={project && project.name || 'project'}
              rightIcon="caret-down"
            />
          </Select>
          <Select
            items={ languages }
            itemRenderer={languageRenderer}
            onItemSelect={(lang) => setLanguage(lang.code)}
            filterable={false}
            minimal={true}
            >
            <Button
                text={language}
                rightIcon="caret-down"
              />
          </Select>
        </ButtonGroup>
        <Navbar.Divider />
        
        <ButtonGroup minimal={true}>
        { isValidating ? <Spinner size={16} /> : 
          <Button
            icon="refresh"
            intent="primary"
            minimal={true}
            onClick={() => { mutate(url) }}
            disabled={isValidating}
          />
        }
        <Button
          text="Deploy"
          icon="build"
          intent="success"
          onClick={() => { deploy() }}
          disabled={isValidating}
        />
        </ButtonGroup>
      </Navbar.Group>
    </Navbar>
    
    { error && <Callout intent="warning">{error.message}</Callout>}
    
    { data && data.project && data.images &&
      <Container isValidating={isValidating} key={0}>
        <Component data={data} key={0} />
      </Container>
    }

    {
      !data &&
      <Callout intent="none">Waiting for a preview to show up. Choose an article from the list above.</Callout>
    }

    <Toaster position={Position.BOTTOM}>
      { isValidating && <Toast icon="refresh" intent="primary" message={`Refreshing the preview of '${project.name}'`} /> }
    </Toaster>
    <Footer />
    </>
  )
}