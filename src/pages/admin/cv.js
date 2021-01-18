import React from 'react'
import Helmet from 'react-helmet'

import {
  Navbar,
  Breadcrumbs,
  Breadcrumb,
  Tree,
} from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'

import Head from '.../../components/head'
import Footer from '.../../components/footer'


const breadcrumbs = [
  { href: '/admin', icon: "application" },
  { href: '/admin/cv', text: 'cv', current: true },
]

const breadcrumbRenderer = ({ text, ...props }) => {
  return <Breadcrumb {...props}>{text}</Breadcrumb>
}

const skillsNodes = [
  {
    id: 0,
    hasCaret: true,
    label: "Skills",
    isExpanded: true,
    childNodes: [
      {
        id: 1,
        label: "Sections",
      },
      {
        id: 2,
        label: "Items",
      }
    ]
  },
]

export default () => {

  return (
    <main style={{height: '100vh'}}>
      <Helmet>
        <Head />
        <title>Admin {'>'} CV | Mark Spurgeon</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>

      <Navbar>
        <Navbar.Group>
          <Breadcrumbs 
            currentBreadcrumbRenderer={breadcrumbRenderer}
            items={breadcrumbs}
            collapseFrom='end'
            minVisibleItems={1}
            style={{maxWidth: '100pt'}}
          />
        </Navbar.Group>
      </Navbar>

      <Tree 
        contents={skillsNodes}
      />

      <Footer />
    </main>
  )
}